const { User } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.delete("/api/user/delete/:id", auth, (req, res) => {
    User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) {
          const message = `L'administrateur demandée n'existe pas. Réessayer avec un autre identifiant`;
          res.status(404).json({ message });
        }
        const userDeleted = user;
        return User.destroy({
          where: { id: user.id },
        }).then((_) => {
          const message = `L'administrateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`;
          res.json({ message, data: userDeleted });
        });
      })
      .catch((error) => {
        const message = `L'administrateur n'a pu être supprimé. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
