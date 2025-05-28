'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Clientes', 'cep', {
      type: Sequelize.STRING,
      allowNull: true // Permite nulo
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clientes', 'cep');
  }
};