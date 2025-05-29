// backend/models/itempedidocliente.js
module.exports = (sequelize, DataTypes) => {
  const ItemPedidoCliente = sequelize.define('ItemPedidoCliente', {
    pedidoClienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // Chave estrangeira para a tabela PedidosCliente
        model: 'PedidosCliente',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Se o pedido pai for deletado, os itens são deletados também
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // Chave estrangeira para a tabela Produtos
        model: 'Produtos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT', // Não permite deletar produto se houver item de pedido referenciando
    },
    quantidade: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    preco_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'ItensPedidoCliente', // Define o nome da tabela explicitamente
  });

  ItemPedidoCliente.associate = function(models) {
    // Um ItemPedidoCliente pertence a um PedidoCliente
    ItemPedidoCliente.belongsTo(models.PedidoCliente, { foreignKey: 'pedidoClienteId', as: 'pedido_cliente' });
    // Um ItemPedidoCliente pertence a um Produto
    ItemPedidoCliente.belongsTo(models.Produto, { foreignKey: 'produtoId', as: 'produto' });
  };

  return ItemPedidoCliente;
};