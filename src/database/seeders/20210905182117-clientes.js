"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Clientes",
      [
        {
          nome: "Administrador",
          email: "admin@email.com",
          senha: "12345",
          isAdmin: true,
        },
        {
          nome: "Bertha Lutz",
          email: "berthalutz@email.com",
          senha: "12345",
        },
        {
          nome: "Paulo Freire",
          email: "paulofreire@email.com",
          senha: "12345",
        },
        {
          nome: "Ariano Suassuna",
          email: "arianosuassuna@email.com",
          senha: "12345",
        },
        {
          nome: "Maria da Penha",
          email: "mpenha@email.com",
          senha: "12345",
        },
        {
          nome: "Chica da Silva",
          email: "chiquinha@email.com",
          senha: "12345",
        },
        {
          nome: "Angela Davis",
          email: "angeladavis@email.com",
          senha: "12345",
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
