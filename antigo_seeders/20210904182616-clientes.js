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
        senha: '000wedsd'
      },
      {
        nome: 'Rafa',
        email: 'rafa@email.com',
        senha: '123212415245'
      },
      {
        nome: 'Jaqueline',
        email: 'jaque@email.com',
        senha: 'fghysdds12'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};
