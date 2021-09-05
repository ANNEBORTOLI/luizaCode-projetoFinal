'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Pedidos',  // name of Source table
      'id_loja', //name of the key we're adding
        { 
        type: Sequelize.INTEGER,
        references:{
          model: 'Lojas', // name of Target table
          key: 'id' // key in Target table that we're referencing
        } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Pedidos', // name of Source table
      'id_loja' // key we want to remove
    );
  }
};
