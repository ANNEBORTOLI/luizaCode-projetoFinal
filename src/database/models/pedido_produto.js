'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoProduto extends Model {

    static associate(models) {
      // define association here
    }
  };
  PedidoProduto.init({}, {
    sequelize,
    modelName: 'PedidoProduto',
  });
  return PedidoProduto;
};