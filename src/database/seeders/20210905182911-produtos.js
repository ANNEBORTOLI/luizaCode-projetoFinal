"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Produtos",
      [
        {
          nome: "Robô Aspirador de Pó Inteligente Roomba® s9+ iRobot",
          marca: "iRobot",
          categoria: "eletrodomésticos",
          tipo: "aspirador",
          preco: 9449.99,
        },
        {
          nome: "Monitor Gamer Curvo Samsung 49",
          marca: "Samsung",
          categoria: "Acessórios e Inovação",
          tipo: "monitor",
          preco: 8899,
        },
        {
          nome: "iMac de 24 polegadas",
          marca: "Apple",
          categoria: "eletrônico",
          tipo: "computador",
          preco: 22.599,
        },
        {
          nome: "iPhone 12 Pro Max Apple 128GB",
          marca: "Apple",
          categoria: "Telefones e Celulares",
          tipo: "smartphone",
          preco: 8024.97,
        },
        {
          nome: "Samsung Galaxy S21Ultra ",
          marca: "samsung",
          categoria: "Telefones e Celulares",
          tipo: "smartphone",
          preco: 6738.3,
        },
        {
          nome: "Geladeira Smart Side by Side Inverter Inox",
          marca: "LG",
          categoria: "eletrodomésticos",
          tipo: "geladeira",
          preco: 4500,
        },
        {
          nome: "Refrigerador Brastemp Side Inverse Evox",
          marca: "Brastemp",
          categoria: "eletrodoméstico",
          tipo: "geladeira",
          preco: 5.489,
        },
        {
          nome: "Tequila Gran Patron Anejo 750 Ml",
          marca: "Patron Anejo",
          categoria: "Destilados, licores e coquetéis",
          tipo: "bebidas",
          preco: 5099.15,
        },
        {
          nome: "Vodka Crystal Head Aurora 750 Ml",
          marca: "Absolut",
          categoria: "Destilados, licores e coquetéis",
          tipo: "bebidas",
          preco: 898,
        },
        {
          nome: "Kit de Chocolate Belga Luckau",
          marca: "Luckau",
          categoria: "Mercado",
          tipo: "chocolate",
          preco: 690.48,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Produtos", null, {});
  },
};
