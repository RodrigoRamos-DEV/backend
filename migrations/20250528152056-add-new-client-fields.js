'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adiciona a coluna 'cpf_cnpj'
    await queryInterface.addColumn('Clientes', 'cpf_cnpj', {
      type: Sequelize.STRING,
      allowNull: true // Permitir nulo, pois nem todos os clientes terão CPF/CNPJ imediatamente ou será exigido
    });
    // Adiciona a coluna 'numero_endereco'
    await queryInterface.addColumn('Clientes', 'numero_endereco', {
      type: Sequelize.STRING,
      allowNull: true
    });
    // Adiciona a coluna 'complemento'
    await queryInterface.addColumn('Clientes', 'complemento', {
      type: Sequelize.STRING,
      allowNull: true
    });
    // Adiciona a coluna 'cidade'
    await queryInterface.addColumn('Clientes', 'cidade', {
      type: Sequelize.STRING,
      allowNull: true
    });
    // Adiciona a coluna 'uf'
    await queryInterface.addColumn('Clientes', 'uf', {
      type: Sequelize.STRING,
      allowNull: true
    });
    // Adiciona a coluna 'email'
    await queryInterface.addColumn('Clientes', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove as colunas em caso de rollback da migração
    await queryInterface.removeColumn('Clientes', 'cpf_cnpj');
    await queryInterface.removeColumn('Clientes', 'numero_endereco');
    await queryInterface.removeColumn('Clientes', 'complemento');
    await queryInterface.removeColumn('Clientes', 'cidade');
    await queryInterface.removeColumn('Clientes', 'uf');
    await queryInterface.removeColumn('Clientes', 'email');
  }
};