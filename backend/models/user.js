'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'idUser' })
      User.hasMany(models.comment, { foreignKey: 'idUser' })
      User.hasMany(models.like, { foreignKey: 'idUser' })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    biography: DataTypes.STRING(400)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};