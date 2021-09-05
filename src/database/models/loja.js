'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loja extends Model {

    static associate(models) {
      // define association here
      Loja.hasMany(models.Pedido, {
        foreignKey:'id_loja'
       });
    }
  };
  Loja.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Loja',
  });
  return Loja;
};