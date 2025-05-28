// C:\Users\Rodrigo Ramos SSD\Desktop\ARK\backend\models\produto.js
module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        preco_venda: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        preco_custo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        estoque_atual: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        estoque_minimo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        unidade_medida: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        codigo_barras: {
            type: DataTypes.STRING, // Alterado para STRING sem limite, para códigos de barras longos
            allowNull: true,
            unique: true
        },
        ncm: {
            type: DataTypes.STRING(9), // Aumentado para 9 caracteres (NCM pode ter 8 ou 9 se tiver o dígito verificador)
            allowNull: true
        },
        icms_aliquota: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        ipi_aliquota: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        pis_aliquota: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        cofins_aliquota: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true
        },
        origem: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: true
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Produto;
};