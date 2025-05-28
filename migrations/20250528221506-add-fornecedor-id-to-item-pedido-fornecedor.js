'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ItensPedidoFornecedor', 'fornecedorId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Pode ser nulo
      references: {
        model: 'Fornecedores',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ItensPedidoFornecedor', 'fornecedorId');
  }
};