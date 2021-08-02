'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.User, {
        foreignKey: 'idUser',
        onDelete: 'CASCADE',
      });
      comment.belongsTo(models.Post, {
        foreignKey: 'idPost',
        onDelete: 'CASCADE',
      });
    }
  };
  comment.init({
    idPost: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};