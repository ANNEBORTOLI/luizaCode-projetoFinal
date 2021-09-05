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
        preco: 850
       },
       {
        nome: 't14',
        marca: 'lenovo',
        categoria: 'eletrônico',
        tipo: 'notebook',
        preco: 5000
       },
       {
        nome: 'iphone 12',
        marca: 'apple',
        categoria: 'eletrônico',
        tipo: 'smartphone',
        preco: 5600
      },
      {
      nome: 'active',
      marca: 'brastemp',
      categoria: 'eletrodoméstico',
      tipo: 'geladeira',
      preco: 1200
      }
     ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Produto', null, {});
  }
};
