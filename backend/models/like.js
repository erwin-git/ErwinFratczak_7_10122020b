'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      like.belongsTo(models.User, {
        foreignKey: 'idUser',
        onDelete: 'CASCADE',
      });
      like.belongsTo(models.Post, {
        foreignKey: 'idPost',
        onDelete: 'CASCADE',
      });

    }
  };
  like.init({
    idPost: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });


  return like;
};