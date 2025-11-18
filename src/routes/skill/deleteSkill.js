const { Skill } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.delete("/api/skill/delete/:id", auth, (req, res) => {
    Skill.findByPk(req.params.id)
      .then((skill) => {
        if (skill === null) {
          const message = `La compétence demandée n'existe pas. Réessayer avec un autre identifiant`;
          res.status(404).json({ message });
        }
        const skillDeleted = skill;
        return Skill.destroy({
          where: { id: skill.id },
        }).then((_) => {
          const message = `La compétence avec l'identifiant n°${skillDeleted.id} a bien été supprimé.`;
          res.json({ message, data: skillDeleted });
        });
      })
      .catch((error) => {
        const message = `La compétence n'a pu être supprimé. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
