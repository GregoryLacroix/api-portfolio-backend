const { Sequelize, DataTypes } = require("sequelize");
const PortfolioModel = require("../models/portfolio");
const SkillModel = require("../models/skill");
const UserModel = require("../models/user");
const portfolios = require("./mock-portfolio");
const skills = require("./mock-skill");
const bcrypt = require("bcryptjs");

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    "apkmtubg_api_backend_portfolio",
    "apkmtubg_user_api",
    "Turkish28410!",
    {
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        timezone: "+00:00",
      },
      logging: true,
    }
  );
} else {
  sequelize = new Sequelize(
    "api_backend_portfolio",
    "user_api",
    "Turkish28410!",
    {
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        timezone: "+00:00",
      },
      logging: false,
    }
  );
}

const Portfolio = PortfolioModel(sequelize, DataTypes);
const Skill = SkillModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

// const initDb = () => {
//   return sequelize.sync({ force: true }).then((_) => {
// portfolios.map((portfolio) => {
//   Portfolio.create({
//     image: portfolio.image,
//     title: portfolio.title,
//     skills: portfolio.skills,
//     url: portfolio.url,
//     bgColor: portfolio.bgColor,
//   }).then((portfolio) => console.log(portfolio.toJSON()));
// });
// skills.map((skill) => {
//   Skill.create({
//     name: skill.name,
//     cssClass: skill.cssClass,
//   }).then((skill) => console.log(skill.toJSON()));
// });
//   bcrypt
//     .hash("Turkish28410!", 10)
//     .then((hash) =>
//       User.create({
//         email: "gregorylacroix78@gmail.com",
//         firstName: "Grégory",
//         lastName: "LACROIX",
//         password: hash,
//         avatar: "avatar3.png",
//       })
//     )
//     .then((user) => console.log(user.toJSON()));
//   console.log("La base de donnée a bien été initialisée !");
// });
// };

module.exports = {
  // initDb,
  Portfolio,
  Skill,
  User,
};
