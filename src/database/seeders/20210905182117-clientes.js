"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Clientes",
      [
        {
          nome: "Administrador",
          email: "admin@email.com",
          senha: bcrypt.hashSync("12345", 10),
          isAdmin: true,
        },
        {
          nome: "Bertha Lutz",
          email: "berthalutz@email.com",
          senha: bcrypt.hashSync("54321", 10),
        },
      ],
      {
        ignoreDuplicates: true,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Clientes", null, {});
  },
};
