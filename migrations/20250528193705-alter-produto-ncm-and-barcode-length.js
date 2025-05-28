// C:\Users\Rodrigo Ramos SSD\Desktop\ARK\backend\migrations\SEUTIMESTAMP-alter-produto-ncm-and-barcode-length.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Altera o tipo da coluna 'ncm' para aceitar mais caracteres (STRING por padrão é VARCHAR(255) no PostgreSQL se não for especificado)
    await queryInterface.changeColumn('Produtos', 'ncm', {
      type: Sequelize.STRING(9), // Mudar para 9 caracteres, ou apenas Sequelize.STRING para VARCHAR(255)
      allowNull: true // Mantenha o allowNull original
    });

    // Altera o tipo da coluna 'codigo_barras' para STRING (VARCHAR(255) por padrão)
    await queryInterface.changeColumn('Produtos', 'codigo_barras', {
      type: Sequelize.STRING, // STRING sem limite de tamanho (VARCHAR(255))
      allowNull: true, // Mantenha o allowNull original
      unique: true // Mantenha a restrição de unicidade
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverte as alterações (opcional, mas bom para rollbacks)
    await queryInterface.changeColumn('Produtos', 'ncm', {
      type: Sequelize.STRING(8), // Reverte para o tamanho original
      allowNull: true
    });

    await queryInterface.changeColumn('Produtos', 'codigo_barras', {
      type: Sequelize.STRING(255), // Reverte para um tamanho padrão ou mais restrito se houver um antigo
      allowNull: true,
      unique: true
    });
  }
};