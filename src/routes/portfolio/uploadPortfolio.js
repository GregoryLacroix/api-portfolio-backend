const auth = require("../../auth/auth");
require("dotenv").config();
const { uploadFile } = require("../../db/uploadFile");

module.exports = (app) => {
  app.post("/api/portfolio/new/upload", auth, async (req, res) => {
    try {
      console.log("FILES =", req.files);
      console.log("BODY =", req.body);

      // Vérifie qu'on a bien un fichier
      if (!req.files || !req.files.image) {
        return res
          .status(400)
          .json({ error: "Aucun fichier reçu ou champ 'image' manquant" });
      }

      const file = req.files.image;

      // Upload vers S3
      const s3Key = await uploadFile(file, process.env.FOLDER_PORTFOLIO);

      return res.status(200).json({
        message: "Image uploadée avec succès !",
        key: s3Key,
        url: `https://${process.env.S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com/${s3Key}`,
      });
    } catch (err) {
      console.error("Erreur upload:", err);
      return res.status(500).json({ error: "Erreur lors de l'upload" });
    }
  });
};
