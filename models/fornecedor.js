// backend/models/fornecedor.js
module.exports = (sequelize, DataTypes) => {
    const Fornecedor = sequelize.define('Fornecedor', {
        nome: { // Nome / Razão Social
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf_cnpj: { // CPF/CNPJ (substitui 'cnpj' direto para padronizar)
            type: DataTypes.STRING,
            unique: true // CPF/CNPJ deve ser único
        },
        email: { // E-mail
            type: DataTypes.STRING
        },
        telefone: { // Telefone - Certifique-se que o tipo é STRING
            type: DataTypes.STRING 
        },
        endereco: {
            type: DataTypes.STRING
        },
        numero_endereco: { // Número do Endereço
            type: DataTypes.STRING
        },
        bairro: {
            type: DataTypes.STRING
        },
        cidade: {
            type: DataTypes.STRING
        },
        uf: {
            type: DataTypes.STRING
        },
        cep: { // CEP
            type: DataTypes.STRING
        },
        complemento: { // Complemento
            type: DataTypes.STRING
        }
    }, {
        tableName: 'Fornecedores' // Define o nome da tabela explicitamente
    });
    return Fornecedor;
};