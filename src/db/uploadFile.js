const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const uploadFile = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) return reject(new Error("Aucun fichier fourni"));

      const s3 = new S3Client({
        region: process.env.REGION,
        credentials: {
          accessKeyId: process.env.ACCESS_KEY_ID,
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
        },
      });

      const S3_BUCKET = process.env.S3_BUCKET;

      const key = folder + "/" + file.name;
      const contentType = file.mimetype || "application/octet-stream";

      // Si tu utilises express-fileupload avec useTempFiles = false, tu peux envoyer file.data directement
      await s3.send(
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
          Body: file.data,
          ContentType: contentType,
          ACL: "public-read",
          CacheControl: "max-age=31536000, public",
        })
      );

      console.log("Upload AWS OK :", key);
      resolve(key);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { uploadFile };
