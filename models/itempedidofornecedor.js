// backend/models/itempedidofornecedor.js
module.exports = (sequelize, DataTypes, Sequelize) => { // Adicionado 'Sequelize' aqui
    const ItemPedidoFornecedor = sequelize.define('ItemPedidoFornecedor', {
        pedidoFornecedorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        produtoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        preco_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        caminhaoId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fornecedorId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Fornecedores',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_envio_wpp: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Aguardando Envio'
        }
    }, {
        tableName: 'ItensPedidoFornecedor',
    });

    ItemPedidoFornecedor.associate = function(models) {
        ItemPedidoFornecedor.belongsTo(models.PedidoFornecedor, { foreignKey: 'pedidoFornecedorId', as: 'pedido_fornecedor' });
        ItemPedidoFornecedor.belongsTo(models.Produto, { foreignKey: 'produtoId', as: 'produto' });
        ItemPedidoFornecedor.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
        ItemPedidoFornecedor.belongsTo(models.Caminhao, { foreignKey: 'caminhaoId', as: 'caminhao' });
        ItemPedidoFornecedor.belongsTo(models.Fornecedor, { foreignKey: 'fornecedorId', as: 'fornecedor' });
    };

    return ItemPedidoFornecedor;
};