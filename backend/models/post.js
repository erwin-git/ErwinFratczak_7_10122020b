'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'idUser' })
      Post.hasMany(models.comment, { foreignKey: 'idPost' })
      Post.hasMany(models.like, { foreignKey: 'idPost' })
    }
  };
  Post.init({
    idUser: DataTypes.INTEGER,
    content: DataTypes.STRING,
    fileUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};