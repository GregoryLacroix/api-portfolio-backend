const { User } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.put("/api/user/update/:id", auth, (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return User.findByPk(id).then((user) => {
          if (user === null) {
            const message = `L'administrateur demandé n'existe pas. Réessayer avec un autre identifiant`;
            res.status(404).json({ message });
          }
          const message = `La compétence ${user.email} a bien été modifié.`;
          res.json({ message, data: skill });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `L'administrateur n'a pu être modifié. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
