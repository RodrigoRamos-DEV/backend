// backend/migrations/SEUTIMESTAMP-create-item-pedido-fornecedor.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ItensPedidoFornecedor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedidoFornecedorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { // Chave estrangeira para a tabela PedidosFornecedor
          model: 'PedidosFornecedor', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Se o pedido pai for deletado, os itens são deletados também
      },
      produtoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { // Chave estrangeira para a tabela Produtos
          model: 'Produtos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT', // Não permite deletar produto se houver item de pedido referenciando
      },
      quantidade: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      clienteId: { // Para qual cliente este item se destina (se houver)
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { // Chave estrangeira para a tabela Clientes
          model: 'Clientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Se o cliente for deletado, o ID aqui vira NULL
      },
      caminhaoId: { // Caminhão que levará este item (se houver)
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { // Chave estrangeira para a tabela Caminhoes
          model: 'Caminhoes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Se o caminhão for deletado, o ID aqui vira NULL
      },
      observacoes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status_envio_wpp: { // Status específico para o envio via WhatsApp (se for usar)
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Aguardando Envio' // Ex: Aguardando Envio, Enviado WPP, Erro WPP
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
    await queryInterface.dropTable('ItensPedidoFornecedor');
  }
};