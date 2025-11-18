const { Portfolio } = require("../../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.get("/api/portfolio/:id", (req, res) => {
    Portfolio.findByPk(req.params.id)
      .then((portfolio) => {
        const message = "Le portfolio a bien été récupérée.";
        res.json({ message, data: portfolio });
      })
      .catch((error) => {
        const message = `Le portfolios n'a pu être trouvé. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
