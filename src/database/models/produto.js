'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {

    static associate(models) {
      // define association here
      Produto.belongsToMany(
        models.Pedido,  
        { 
          through: 'pedido_produto',
          foreignKey: 'id_produto' 
        });
    }
  };
  Produto.init({
    nome: DataTypes.STRING,
    marca: DataTypes.STRING,
    categoria: DataTypes.STRING,
    tipo: DataTypes.STRING,
    preco: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};