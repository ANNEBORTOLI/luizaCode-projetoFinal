"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      // define association here
      Cliente.hasMany(models.Pedido, {
        foreignKey: "id_cliente",
      });
    }
  }
  Cliente.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Cliente",
    },
  );
  return Cliente;
};
