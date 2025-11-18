const { Portfolio } = require("../../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/portfolios", (req, res) => {
    if (req.query.title) {
      const name = req.query.title;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        const message = `Le paramètre de recherche doit contenir au minimum 2 caractères.`;
        return res.status(400).json({ message });
      }

      return Portfolio.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ["title"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} portfolios qui correspondent au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
        Portfolio.findAll({ order: ["title"] })
        .then((portfolios) => {
          const message = "La liste des portfolios a bien été récupérée.";
          res.json({ message, data: portfolios });
        })
        .catch((error) => {
          const message = `La liste des portfolios n'a pu être trouvé. Réessayer dans quelques instants`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
