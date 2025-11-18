/* Authentification : Créer un modèle User avec Sequelize */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Adresse email existante.",
        },
        validate: {
          notEmpty: {
            msg: "Merci de saisir une adresse email.",
          },
          notNull: { msg: "L'email est une propriété requise." },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 20],
            msg: "Le prénom doit contenir au minimum 2 caractères.",
          },
          notEmpty: {
            msg: "Merci de saisir un prénom.",
          },
          notNull: { msg: "Le prénom est une propriété requise." },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Merci de saisir un nom.",
          },
          notNull: { msg: "Le nom est une propriété requise." },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // validatePassword(password) {
          //   if (
          //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,30}$/.test(
          //       password
          //     )
          //   ) {
          //     throw new Error(
          //       "Le mot de passe doit contenir au moins 8 caractères dont au moins 1 majuscule, 1 minuscule, un chiffre et un caractère spécial."
          //     );
          //   }
          // },
          // not: ["/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/",'i'],
          // len : {
          //   args: [8, 100],
          //   msg: "Le mot de passe doit contenir au minimum 8 caractères.",
          // },
          notEmpty: {
            msg: "Merci de saisir un mot de passe.",
          },
          notNull: { msg: "Le mot de passe est une propriété requise." },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Merci de télécharger une image.",
          },
          notNull: { msg: "L'image est une propriété requise." },
        },
      },
      roles: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ROLE_ADMIN",
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
