'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Remover coluna 'contato'
    await queryInterface.removeColumn('Fornecedores', 'contato');

    // 2. Remover coluna 'cnpj'
    await queryInterface.removeColumn('Fornecedores', 'cnpj');

    // 3. Adicionar coluna 'cpf_cnpj' (como substituto de cnpj e com unique)
    await queryInterface.addColumn('Fornecedores', 'cpf_cnpj', {
      type: Sequelize.STRING,
      allowNull: true, // Permitir nulo inicialmente, caso você migre dados antigos
      unique: true // Garante unicidade
    });

    // 4. Adicionar coluna 'numero_endereco'
    await queryInterface.addColumn('Fornecedores', 'numero_endereco', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // 5. Adicionar coluna 'complemento'
    await queryInterface.addColumn('Fornecedores', 'complemento', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // (Opcional: Se 'email' no fornecedor não existia e agora existe, e for diferente do nome 'email' antes)
    // Se o campo 'email' já existia, não precisa adicionar novamente.
    // Se 'email' foi renomeado de 'email_contato', etc., precisaria de um 'renameColumn' ou 'removeColumn'/'addColumn'.
    // Pelo que vejo, 'email' já estava lá, então não adicionaremos novamente.
  },

  async down (queryInterface, Sequelize) {
    // Reverta as alterações na ordem inversa
    await queryInterface.removeColumn('Fornecedores', 'complemento');
    await queryInterface.removeColumn('Fornecedores', 'numero_endereco');
    await queryInterface.removeColumn('Fornecedores', 'cpf_cnpj'); // Remover a nova coluna

    // Adicionar de volta as colunas antigas se necessário para rollback total
    await queryInterface.addColumn('Fornecedores', 'cnpj', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
    await queryInterface.addColumn('Fornecedores', 'contato', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};