const { Portfolio } = require("../../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../../auth/auth");

module.exports = (app) => {
  app.put("/api/portfolio/update/:id", auth, (req, res) => {
    
    const id = req.params.id;
    Portfolio.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Portfolio.findByPk(id).then((Porfolio) => {
          if (Porfolio === null) {
            const message = `Le portfolio demandé n'existe pas. Réessayer avec un autre identifiant`;
            res.status(404).json({ message });
          }
          const message = `Le portfolio ${Porfolio.title} a bien été modifié.`;
          res.json({ message, data: Porfolio });
        });
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le portfolio n'a pu être modifié. Réessayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
