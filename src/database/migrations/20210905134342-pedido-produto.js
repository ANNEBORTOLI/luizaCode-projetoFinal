'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable(
      'pedido_produto', 
      { 
        id_pedido: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references:{
            model: 'Pedidos', // name of Target table
            key: 'id' // key in Target table that we're referencing
          }  
        },
        id_produto: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references:{
            model: 'Produtos', // name of Target table
            key: 'id' // key in Target table that we're referencing
          }  
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date()
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date()
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pedido_produto');
  }
};
