/* L’API Rest et la Base de données : Créer un modèle Sequelize */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Skill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Merci de saisir le nom de la compétences.",
          },
          notNull: { msg: "La compétence est une propriété requise." },
        },
      },
      cssClass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Merci de saisir une class css.",
          },
          notNull: { msg: "La css class est une propriété requise." },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
