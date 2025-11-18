/* L’API Rest et la Base de données : Créer un modèle Sequelize */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Portfolio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Merci de télécharger une image.",
          },
          notNull: { msg: "L'image' est une propriété requise." },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le titre est déjà pris.",
        },
        validate: {
          notEmpty: {
            msg: "Merci de saisir un titre.",
          },
          notNull: { msg: "Le titre est une propriété requise." },
        },
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Merci de saisir les technologies.",
          },
          notNull: { msg: "La technologie est une propriété requise." },
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Merci de saisir une URL.",
          },
          notNull: { msg: "L'URL est une propriété requise." },
        },
      },
      bgColor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
