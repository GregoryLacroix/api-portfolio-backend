const { Skill } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.put("/api/skill/update/:id", auth, (req, res) => {
    const id = req.params.id;
    Skill.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Skill.findByPk(id).then((Skill) => {
          if (Skill === null) {
            const message = `La compétence demandé n'existe pas. Réessayer avec un autre identifiant`;
            res.status(404).json({ message });
          }
          const message = `La compétence ${Skill.name} a bien été modifiée.`;
          res.json({ message, data: Skill });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `La compétence n'a pu être modifiée. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
