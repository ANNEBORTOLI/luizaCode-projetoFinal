'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {

    static associate(models) {
      // define association here
      Pedido.belongsTo(models.Cliente);
      Pedido.belongsTo(models.Loja);
      Pedido.belongsToMany(
        models.Produto,
        { 
          through: 'pedido_produto', 
          foreignKey: 'id_pedido'
      });
    }
  };
  Pedido.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};