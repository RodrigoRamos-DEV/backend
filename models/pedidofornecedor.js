// backend/models/pedidofornecedor.js
module.exports = (sequelize, DataTypes, Sequelize) => { // Adicionado 'Sequelize' aqui
    const PedidoFornecedor = sequelize.define('PedidoFornecedor', {
        data_pedido: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_DATE') // Agora Sequelize está definido
        },
        fornecedorId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Criado'
        }
    }, {
        tableName: 'PedidosFornecedor',
    });

    PedidoFornecedor.associate = function(models) {
        PedidoFornecedor.belongsTo(models.Fornecedor, { foreignKey: 'fornecedorId', as: 'fornecedor' });
        PedidoFornecedor.hasMany(models.ItemPedidoFornecedor, { foreignKey: 'pedidoFornecedorId', as: 'itens' });
    };

    return PedidoFornecedor;
};