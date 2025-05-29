// backend/models/pedidocliente.js
module.exports = (sequelize, DataTypes) => {
  const PedidoCliente = sequelize.define('PedidoCliente', {
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // Chave estrangeira para a tabela Clientes
        model: 'Clientes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT', // Não permite deletar cliente se houver pedidos associados
    },
    data_pedido: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW // Padrão para a data atual
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Aberto' // Ex: Aberto, Concluido, Cancelado
    }
  }, {
    tableName: 'PedidosCliente', // Define o nome da tabela explicitamente
  });

  PedidoCliente.associate = function(models) {
    // Um PedidoCliente pertence a um Cliente
    PedidoCliente.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
    // Um PedidoCliente tem muitos ItemPedidoCliente
    PedidoCliente.hasMany(models.ItemPedidoCliente, { foreignKey: 'pedidoClienteId', as: 'itens' });
  };

  return PedidoCliente;
};