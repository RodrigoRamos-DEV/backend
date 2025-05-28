// C:\Users\Rodrigo Ramos SSD\Desktop\ARK\backend\migrations\SEUTIMESTAMP-create-produto.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Produtos', { // Nome da tabela no BD
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false // Nome é obrigatório
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      preco_venda: {
        type: Sequelize.DECIMAL(10, 2), // 10 dígitos no total, 2 após a vírgula
        allowNull: false
      },
      preco_custo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      estoque_atual: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 // Inicia com 0
      },
      estoque_minimo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      unidade_medida: {
        type: Sequelize.STRING(10), // Ex: 'UN', 'KG'
        allowNull: true
      },
      codigo_barras: {
        type: Sequelize.STRING,
        allowNull: true, // Permitir nulo (mas se for preenchido, deve ser único)
        unique: true // Código de barras deve ser único
      },
      ncm: {
        type: Sequelize.STRING(8), // NCM geralmente tem 8 dígitos
        allowNull: true
      },
      icms_aliquota: {
        type: Sequelize.DECIMAL(5, 2), // Ex: 18.00
        allowNull: true
      },
      ipi_aliquota: { // NOVO CAMPO: IPI
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      pis_aliquota: { // NOVO CAMPO: PIS
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      cofins_aliquota: { // NOVO CAMPO: COFINS
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      origem: { // Campo "origem" (anteriormente chamado 'origem_mercadoria' no frontend)
        type: Sequelize.STRING,
        allowNull: true
      },
      ativo: { // Campo "ativo"
        type: Sequelize.BOOLEAN,
        allowNull: false, // É obrigatório
        defaultValue: true // Produtos são ativos por padrão
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: true
      },
      observacoes: { // NOVO CAMPO: Observações
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('Produtos');
  }
};