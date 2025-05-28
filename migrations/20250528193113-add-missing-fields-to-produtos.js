// C:\Users\Rodrigo Ramos SSD\Desktop\ARK\backend\migrations\SEUTIMESTAMP-add-missing-fields-to-produtos.js
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Estas colunas podem já existir dependendo de como a migração inicial foi executada.
    // Vamos tentar adicioná-las. Se alguma já existe, você pode comentar a linha dela.
    // O erro atual é para 'origem'.

    // Adiciona a coluna 'ipi_aliquota'
    //await queryInterface.addColumn('Produtos', 'ipi_aliquota', {
     // type: Sequelize.DECIMAL(5, 2),
     // allowNull: true
   // });
    // Adiciona a coluna 'pis_aliquota'
   // await queryInterface.addColumn('Produtos', 'pis_aliquota', {
     // type: Sequelize.DECIMAL(5, 2),
     // allowNull: true
   // });
    // Adiciona a coluna 'cofins_aliquota'
   // await queryInterface.addColumn('Produtos', 'cofins_aliquota', {
   //   type: Sequelize.DECIMAL(5, 2),
   //   allowNull: true
  //  });

    // CUIDADO AQUI: O ERRO INDICA QUE 'origem' JÁ EXISTE.
    // Se a coluna 'origem' já existe, COMENTE a linha abaixo.
    // Se você PRECISA mudar o tipo ou allowNull de 'origem', use 'changeColumn' em uma nova migração.
    // Por enquanto, assumimos que ela só precisa existir e já existe.
    /*
    await queryInterface.addColumn('Produtos', 'origem', {
      type: Sequelize.STRING,
      allowNull: true
    });
    */

    // CUIDADO AQUI: 'ativo' e 'categoria' também podem já existir da migração inicial de create-produto.
    // Se estas colunas já existem, COMENTE as linhas abaixo.
    // Se você PRECISA ajustar o defaultValue ou allowNull, use 'changeColumn' em uma nova migração.
    /*
    await queryInterface.addColumn('Produtos', 'ativo', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
    */
    /*
    await queryInterface.addColumn('Produtos', 'categoria', {
      type: Sequelize.STRING,
      allowNull: true
    });
    */

    // Adiciona a coluna 'observacoes'
    await queryInterface.addColumn('Produtos', 'observacoes', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverter as adições na ordem inversa
    await queryInterface.removeColumn('Produtos', 'observacoes');
    
    // As colunas comentadas acima no 'up' também devem ser comentadas aqui no 'down' se não foram adicionadas.
    // await queryInterface.removeColumn('Produtos', 'categoria');
    // await queryInterface.removeColumn('Produtos', 'ativo');
    // await queryInterface.removeColumn('Produtos', 'origem');

   // await queryInterface.removeColumn('Produtos', 'cofins_aliquota');
    //await queryInterface.removeColumn('Produtos', 'pis_aliquota');
    //await queryInterface.removeColumn('Produtos', 'ipi_aliquota');
  }
};