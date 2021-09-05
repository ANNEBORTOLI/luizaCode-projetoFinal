'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Produtos', 
      [
        {
          nome: 'aspirador',
          marca: 'arno',
          categoria: 'aletroportáteis',
          tipo: 'aspirador',
          preco: 350
         },
         {
          nome: 'monitor 21',
          marca: 'samsung',
          categoria: 'Informática',
          tipo: 'monitor',
          preco: 1449
         },
         {
          nome: 't14',
          marca: 'lenovo',
          categoria: 'eletrônico',
          tipo: 'notebook',
          preco: 4350
         },
         {
          nome: 'iphone 12',
          marca: 'apple',
          categoria: 'eletrônico',
          tipo: 'smartphone',
          preco: 8000
        },
        {
          nome: 'Samsung S21',
          marca: 'samsung',
          categoria: 'eletrônico',
          tipo: 'smartphone',
          preco: 5600
        },
        {
        nome: 'brastemp active',
        marca: 'brastemp',
        categoria: 'eletrodoméstico',
        tipo: 'geladeira',
        preco: 4500
        },
        {
          nome: 'brastemp side by side',
          marca: 'brastemp',
          categoria: 'eletrodoméstico',
          tipo: 'geladeira',
          preco: 12000
        },
        {
          nome: 'Tequila',
          marca: 'Tequila',
          categoria: 'bebidas alcoolicas',
          tipo: 'bebidas',
          preco: 80
        },
        {
          nome: 'Vodka',
          marca: 'Absolut',
          categoria: 'bebidas alcoolicas',
          tipo: 'bebidas',
          preco: 119.9
        },
        {
          nome: 'Caixa de Chocolate',
          marca: 'lacta',
          categoria: 'doces',
          tipo: 'comida',
          preco: 119.9
        }
      ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Produtos', null, {});

  }
};
