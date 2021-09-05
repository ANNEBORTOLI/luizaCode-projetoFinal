'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {

    static associate(models) {
      // define association here
      Cliente.hasMany(models.Pedido, {
         foreignKey:'id_cliente'
        });
    }
  };
  Cliente.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};