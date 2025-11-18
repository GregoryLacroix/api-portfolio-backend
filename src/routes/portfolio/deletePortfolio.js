const { Portfolio } = require("../../db/sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.delete("/api/portfolio/delete/:id", auth,(req, res) => {
    Portfolio.findByPk(req.params.id)
      .then((portfolio) => {
        if (portfolio === null) {
          const message = `Le portfolio demandé n'existe pas. Réessayer avec un autre identifiant`;
          res.status(404).json({ message });
        }
        const portfolioDeleted = portfolio;
        return Portfolio.destroy({
          where: { id: portfolio.id },
        }).then((_) => {
          const message = `Le portfolio avec l'identifiant n°${portfolioDeleted.id} a bien été supprimé.`;
          res.json({ message, data: portfolioDeleted });
          // res.redirect("/");
        });
      })
      .catch((error) => {
        const message = `Le portfolio n'a pu être supprimé. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
