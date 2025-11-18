const { User } = require("../../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/users", auth, (req, res) => {
    if (req.query.email) {
      const name = req.query.email;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        const message = `Le paramètre de recherche doit contenir au minimum 2 caractères.`;
        return res.status(400).json({ message });
      }

      return User.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ["email"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} utilisateurs qui correspondent au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
        User.findAll({ order: ["email"] })
        .then((users) => {
          const message = "La liste des administrateurs a bien été récupérée.";
          res.json({ message, data: users });
        })
        .catch((error) => {
          const message = `La liste des administrateurs n'a pu être trouvé. Réessayer dans quelques instants`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
