'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adiciona a coluna 'bairro' à tabela 'Clientes'
    await queryInterface.addColumn('Clientes', 'bairro', {
      type: Sequelize.STRING,
      allowNull: true // Permite que o campo bairro seja nulo inicialmente
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove a coluna 'bairro' da tabela 'Clientes' se a migração for revertida
    await queryInterface.removeColumn('Clientes', 'bairro');
  }
};