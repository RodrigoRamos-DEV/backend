// C:\Users\Rodrigo Ramos SSD\Desktop\ARK\backend\models\caminhao.js
module.exports = (sequelize, DataTypes) => {
  const Caminhao = sequelize.define('Caminhao', {
    modelo: {
      type: DataTypes.STRING,
      allowNull: false // Modelo é obrigatório
    },
    placa: {
      type: DataTypes.STRING(8), // Placa geralmente tem 7 caracteres + hífen (ex: ABC-1234)
      allowNull: false,
      unique: true // Placa deve ser única
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    capacidade: {
      type: DataTypes.DECIMAL(10, 2), // Capacidade numérica
      allowNull: false
    },
    unidade_capacidade: { // Unidade de medida da capacidade (KG, CX, etc.)
      type: DataTypes.STRING(5), // Pequena string para "KG" ou "CX"
      allowNull: false // Unidade é obrigatória
    },
    apelido: { // Apelido para o caminhão
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    // Adiciona esta seção para definir o nome da tabela explicitamente
    // Isso resolve o erro de 'Caminhaos' não existir
    tableName: 'Caminhoes' // <-- NOME CORRETO DA TABELA NO BANCO DE DADOS
  });

  // Associações (se houver, seriam definidas aqui)
  
  return Caminhao;
};