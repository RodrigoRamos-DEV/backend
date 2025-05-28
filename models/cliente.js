// C:\Users\Rodrigo Ramos SSD\Desktop\ARK\backend\models\cliente.js
module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING
        },
        endereco: {
            type: DataTypes.STRING
        },
        bairro: {
            type: DataTypes.STRING
        },
        cpf_cnpj: {
            type: DataTypes.STRING
        },
        numero_endereco: {
            type: DataTypes.STRING
        },
        complemento: {
            type: DataTypes.STRING
        },
        cidade: {
            type: DataTypes.STRING
        },
        uf: {
            type: DataTypes.STRING
        },
        cep: { // NOVO CAMPO: CEP
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    });
    return Cliente;
};