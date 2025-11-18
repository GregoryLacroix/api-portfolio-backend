const { Skill } = require("../../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/skills", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        const message = `Le paramètre de recherche doit contenir au minimum 2 caractères.`;
        return res.status(400).json({ message });
      }

      return Skill.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ["name"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} compétences qui correspondent au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
        Skill.findAll({ order: ["name"] })
        .then((skills) => {
          const message = "La liste des compétences a bien été récupérée.";
          res.json({ message, data: skills });
        })
        .catch((error) => {
          const message = `La liste des compétences n'a pu être trouvé. Réessayer dans quelques instants`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
