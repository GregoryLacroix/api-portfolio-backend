const { Portfolio } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../../auth/auth");
const path = require("path");
const assetsFolder = path.join(__dirname, "uploads/portfolio");

module.exports = (app) => {
  app.post("/api/portfolio/new/add", auth, (req, res) => {
    Portfolio.create(req.body)
      .then((portfolio) => {
        const message = `Le portfolio ${req.body.title} a bien été crée.`;
        res.json({ message, data: portfolio });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le portfolio n'a pu être ajouté. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
