"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Lojas",
      [
        {
          nome: "MagaLu Zona Norte-Nordeste",
        },
        {
          nome: "MagaLu Zona Sul",
        },
        {
          nome: "MagaLu Zona Centro",
        },
        {
          nome: "MagaLu Zona Leste",
        },
        {
          nome: "MagaLu Zona Oeste",
        },
        {
          nome: "MagaLu Zona Sudeste",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Lojas", null, {});
  },
};
