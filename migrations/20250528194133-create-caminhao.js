// backend/migrations/SEUTIMESTAMP-create-caminhao.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Caminhoes', { // Nome da tabela no BD
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false // Modelo é obrigatório
      },
      placa: {
        type: Sequelize.STRING(8), // Placa geralmente tem 7 caracteres + hífen (ex: ABC-1234)
        allowNull: false,
        unique: true // Placa deve ser única
      },
      cor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      capacidade: {
        type: Sequelize.DECIMAL(10, 2), // Capacidade numérica
        allowNull: false
      },
      unidade_capacidade: { // Unidade de medida da capacidade (KG, CX, etc.)
        type: Sequelize.STRING(5), // Pequena string para "KG" ou "CX"
        allowNull: false // Unidade é obrigatória
      },
      apelido: { // Apelido para o caminhão
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Caminhoes');
  }
};