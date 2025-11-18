const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const favicon = require("serve-favicon");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [process.env.BASE_URL_FRONT];

const corsOptions = {
  origin: "https://gregorylacroix.go.yn.fr",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // si tu utilises des cookies ou des sessions
};

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json({ limit: "50mb", type: "application/json" }))
  .use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: true,
    })
  )
  .use(cors(corsOptions))
  .use(fileUpload())
  .use(express.static("uploads"));
// sequelize.initDb();

app.get("/", (req, res) => {
  res.json("L'API portfolio est démarée !");
});

require("./src/routes/portfolio/uploadPortfolio")(app);
require("./src/routes/portfolio/createPortfolio")(app);
require("./src/routes/portfolio/deletePortfolio")(app);
require("./src/routes/portfolio/updatePortfolio")(app);
require("./src/routes/portfolio/findAllPortfolios")(app);
require("./src/routes/portfolio/findByPkPortfolio")(app);
require("./src/routes/skill/createSkill")(app);
require("./src/routes/skill/deleteSkill")(app);
require("./src/routes/skill/updateSkill")(app);
require("./src/routes/skill/findAllSkills")(app);
require("./src/routes/skill/findByPkSkill")(app);
require("./src/routes/user/createUser")(app);
require("./src/routes/user/deleteUser")(app);
require("./src/routes/user/updateUser")(app);
require("./src/routes/user/findAllUsers")(app);
require("./src/routes/user/uploadAvatar")(app);
require("./src/routes/user/login")(app);

app.use(function (req, res, next) {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
  next();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("The server has started successfully");
});
