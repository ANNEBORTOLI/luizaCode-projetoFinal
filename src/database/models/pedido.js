'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {

    static associate(models) {
      // define association here
      Pedido.belongsTo(models.Cliente, { foreignKey: 'id_cliente' });
      Pedido.belongsTo(models.Loja, { foreignKey: 'id_loja' });
      Pedido.belongsToMany(
        models.Produto,
        { 
          through: models.PedidoProduto, 
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