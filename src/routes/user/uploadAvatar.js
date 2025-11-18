const auth = require("../../auth/auth");
require('dotenv').config();
const { uploadFile } = require('../../db/uploadFile');
const cors = require("cors");

module.exports = (app) => {
  app.post("/api/avatar/upload",cors(), auth, (req, res) => {
    const image = req.files;

    uploadFile(image, process.env.FOLDER_AVATAR);
  });
};
