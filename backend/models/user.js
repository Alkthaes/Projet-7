'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'UserId',
        onDelete: 'cascade'

      });
      User.hasMany(models.Comment, {
        foreignKey: 'UserId',
        onDelete: "cascade"
      });
    }
  };
  User.init({
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '../assets/default-avatar.jpg'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secteur: {
      type: DataTypes.STRING,
    },
    fonction: {
      type: DataTypes.STRING
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};