'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Pedidos',  // name of Source table
      'id_cliente', //name of the key we're adding
        { 
        type: Sequelize.INTEGER,
        references:{
          model: 'Clientes', // name of Target table
          key: 'id' // key in Target table that we're referencing
        } 
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Pedidos', // name of Source table
      'id_cliente' // key we want to remove
    );
  }
};
