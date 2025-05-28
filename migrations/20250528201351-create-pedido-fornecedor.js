// backend/migrations/SEUTIMESTAMP-create-pedido-fornecedor.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PedidosFornecedor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_pedido: {
        type: Sequelize.DATEONLY, // Apenas a data (sem hora)
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE') // Padrão SQL para a data atual
      },
      fornecedorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Fornecedores',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Criado'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PedidosFornecedor');
  }
};