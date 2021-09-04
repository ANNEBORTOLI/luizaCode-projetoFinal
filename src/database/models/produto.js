'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Produto.init({
    nome: DataTypes.STRING,
    marca: DataTypes.STRING,
    categoria: DataTypes.STRING,
    tipo: DataTypes.STRING,
    preco: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};