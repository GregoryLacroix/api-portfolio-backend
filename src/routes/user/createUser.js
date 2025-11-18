const { User } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcryptjs");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.post("/api/user/new/add", auth, (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        password: req.body.password ? hash : null,
      })
        .then((user) => {
          const message = `L'administrateur ${req.body.email} a bien été crée.`;
          res.json({ message, data: user });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          if (error instanceof UniqueConstraintError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          const message = `L'administrateur n'a pu être ajouté. Réessayer dans quelques instants`;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
