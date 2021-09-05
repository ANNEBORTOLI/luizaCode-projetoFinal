'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Clientes', 
    [
      {
        nome: 'Anne Bortoli',
        email: 'annebortoli@email.com',
        senha: '12345'
      },
      {
        nome: 'Mariana Aguiar',
        email: 'marianaaguiar@email.com',
        senha: '12345'
      },
      {
        nome: 'Ariano Suassuna',
        email: 'arianosuassuna@email.com',
        senha: '12345'
      },
      {
        nome: 'Gabi',
        email: 'gabi@email.com',
        senha: '12345'
      },
      {
        nome: 'Rafa',
        email: 'rafa@email.com',
        senha: '12345'
      },
      {
        nome: 'Jaqueline',
        email: 'jaque@email.com',
        senha: '12345'
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});

  }
};
