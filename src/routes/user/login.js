const { User } = require("../../db/sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const privateKey = require("../../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          const message = `Email ou mot de passe invalide.`;
          return res.status(404).json({ message });
        }

        return bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Email ou mot de passe invalide.`;
              return res.status(401).json({ message });
              // return res.json({ message });
            }

            // Générer un jeton JWT valide pendant 24 heures.
            const token = jwt.sign({ id: user.email }, privateKey, {
              expiresIn: "24h",
            });

            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
        return res.status(500).json({ message, data: error });
        // return res.json({ message });
      });
  });
};
