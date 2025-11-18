const { Skill } = require("../../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/skill/:id", (req, res) => {
    Skill.findByPk(req.params.id)
      .then((skill) => {
        const message = "La compétence a bien été récupérée.";
        res.json({ message, data: skill });
      })
      .catch((error) => {
        const message = `La compétence n'a pu être trouvé. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
