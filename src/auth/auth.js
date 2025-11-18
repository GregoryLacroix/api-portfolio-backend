/* Authentification : Créer un modèle User avec Sequelize */
const jwt = require("jsonwebtoken");
const privateKey = require("./private_key");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token" });
    } else {
    //   res
    //     .status(200)
    //     .send({ message: "You have access to this protected route!" });
      req.userId = decoded.id;
      next();
    }
  });
};
