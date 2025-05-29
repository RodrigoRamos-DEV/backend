// C:\Users\Rodrigo Ramos SSD\Desktop\ARK\backend\server.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const db = require('./models'); // Importa todos os modelos (Cliente, Fornecedor, Produto, PedidoFornecedor, ItemPedidoFornecedor, PedidoCliente, ItemPedidoCliente)
const axios = require('axios'); // Mantido para futuras implementações como consulta de CNPJ

// ************************************************************
// CONFIGURAÇÃO DE MIDDLEWARES
// ************************************************************
app.use(cors({
  origin: 'http://localhost:5173' // Permite requisições apenas do seu frontend
}));
app.use(express.json());

// ************************************************************
// ROTAS DA API
// ************************************************************

// Rota de teste simples para verificar se a API está online
app.get('/', (req, res) => {
  res.send('API do SISTEMA ARK está funcionando!');
});

// ------------------------------------------------------------
// ROTAS DE CLIENTES
// ------------------------------------------------------------
app.post('/api/clientes', async (req, res) => {
  const { nome, telefone, endereco, bairro, cpf_cnpj, numero_endereco, complemento, cidade, uf, cep, email } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'O nome do cliente é obrigatório.' });
  }
  try {
    const novoCliente = await db.Cliente.create({
      nome, telefone, endereco, bairro, cpf_cnpj, numero_endereco, complemento, cidade, uf, cep, email
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar cliente.', details: error.message });
  }
});

app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await db.Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar clientes.', details: error.message });
  }
});

app.put('/api/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, endereco, bairro, cpf_cnpj, numero_endereco, complemento, cidade, uf, cep, email } = req.body;
  try {
    const cliente = await db.Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    cliente.nome = nome !== undefined ? nome : cliente.nome;
    cliente.telefone = telefone !== undefined ? telefone : cliente.telefone;
    cliente.endereco = endereco !== undefined ? endereco : cliente.endereco;
    cliente.bairro = bairro !== undefined ? bairro : cliente.bairro;
    cliente.cpf_cnpj = cpf_cnpj !== undefined ? cpf_cnpj : cliente.cpf_cnpj;
    cliente.numero_endereco = numero_endereco !== undefined ? numero_endereco : cliente.numero_endereco;
    cliente.complemento = complemento !== undefined ? complemento : cliente.complemento;
    cliente.cidade = cidade !== undefined ? cidade : cliente.cidade;
    cliente.uf = uf !== undefined ? uf : cliente.uf;
    cliente.cep = cep !== undefined ? cep : cliente.cep;
    cliente.email = email !== undefined ? email : cliente.email;
    await cliente.save();
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar cliente.', details: error.message });
  }
});

app.delete('/api/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await db.Cliente.destroy({ where: { id: id } });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.status(200).json({ message: 'Cliente excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir cliente.', details: error.message });
  }
});

// ------------------------------------------------------------
// ROTAS DE FORNECEDORES
// ------------------------------------------------------------
app.post('/api/fornecedores', async (req, res) => {
  const { nome, cpf_cnpj, email, telefone, endereco, numero_endereco, bairro, cidade, uf, cep, complemento } = req.body;
  if (!nome || !cpf_cnpj) {
    return res.status(400).json({ error: 'Nome/Razão Social e CPF/CNPJ do fornecedor são obrigatórios.' });
  }
  try {
    const novoFornecedor = await db.Fornecedor.create({
      nome, cpf_cnpj, email, telefone, endereco, numero_endereco, bairro, cidade, uf, cep, complemento
    });
    res.status(201).json(novoFornecedor);
  } catch (error) {
    console.error('Erro ao cadastrar fornecedor:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'CPF/CNPJ já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar fornecedor.', details: error.message });
  }
});

app.get('/api/fornecedores', async (req, res) => {
  try {
    const fornecedores = await db.Fornecedor.findAll();
    res.status(200).json(fornecedores);
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar fornecedores.', details: error.message });
  }
});

app.put('/api/fornecedores/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, cpf_cnpj, email, telefone, endereco, numero_endereco, bairro, cidade, uf, cep, complemento } = req.body;
  try {
    const fornecedor = await db.Fornecedor.findByPk(id);
    if (!fornecedor) {
      return res.status(404).json({ error: 'Fornecedor não encontrado.' });
    }
    if (cpf_cnpj && cpf_cnpj !== fornecedor.cpf_cnpj) {
      const existingFornecedor = await db.Fornecedor.findOne({ where: { cpf_cnpj: cpf_cnpj } });
      if (existingFornecedor && existingFornecedor.id !== fornecedor.id) {
        return res.status(409).json({ error: 'CPF/CNPJ já cadastrado para outro fornecedor.' });
      }
    }
    fornecedor.nome = nome !== undefined ? nome : fornecedor.nome;
    fornecedor.cpf_cnpj = cpf_cnpj !== undefined ? cpf_cnpj : fornecedor.cpf_cnpj;
    fornecedor.email = email !== undefined ? email : fornecedor.email;
    fornecedor.telefone = telefone !== undefined ? telefone : fornecedor.telefone;
    fornecedor.endereco = endereco !== undefined ? endereco : fornecedor.endereco;
    fornecedor.numero_endereco = numero_endereco !== undefined ? numero_endereco : fornecedor.numero_endereco;
    fornecedor.bairro = bairro !== undefined ? bairro : fornecedor.bairro;
    fornecedor.cidade = cidade !== undefined ? cidade : fornecedor.cidade;
    fornecedor.uf = uf !== undefined ? uf : fornecedor.uf;
    fornecedor.cep = cep !== undefined ? cep : fornecedor.cep;
    fornecedor.complemento = complemento !== undefined ? complemento : fornecedor.complemento;
    await fornecedor.save();
    res.status(200).json(fornecedor);
  } catch (error) {
    console.error('Erro ao atualizar fornecedor:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar fornecedor.', details: error.message });
  }
});

app.delete('/api/fornecedores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await db.Fornecedor.destroy({ where: { id: id } });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Fornecedor não encontrado.' });
    }
    res.status(200).json({ message: 'Fornecedor excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir fornecedor:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir fornecedor.', details: error.message });
  }
});

// ------------------------------------------------------------
// ROTAS DE PRODUTOS
// ------------------------------------------------------------
app.post('/api/produtos', async (req, res) => {
  const { nome, descricao, preco_venda, preco_custo, estoque_atual, estoque_minimo,
    unidade_medida, codigo_barras, ncm, icms_aliquota, ipi_aliquota, pis_aliquota,
    cofins_aliquota, origem, ativo, categoria, observacoes } = req.body;
  if (!nome || preco_venda === undefined || estoque_atual === undefined) {
    return res.status(400).json({ error: 'Nome, Preço de Venda e Estoque Atual são obrigatórios para o produto.' });
  }
  try {
    const novoProduto = await db.Produto.create({
      nome, descricao, preco_venda, preco_custo, estoque_atual, estoque_minimo,
      unidade_medida, codigo_barras, ncm, icms_aliquota, ipi_aliquota, pis_aliquota,
      cofins_aliquota, origem, ativo, categoria, observacoes
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Código de Barras já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar produto.', details: error.message });
  }
});

app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await db.Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar produtos.', details: error.message });
  }
});

app.put('/api/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco_venda, preco_custo, estoque_atual, estoque_minimo,
    unidade_medida, codigo_barras, ncm, icms_aliquota, ipi_aliquota, pis_aliquota,
    cofins_aliquota, origem, ativo, categoria, observacoes } = req.body;
  try {
    const produto = await db.Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    if (codigo_barras && codigo_barras !== produto.codigo_barras) {
      const existingProduto = await db.Produto.findOne({ where: { codigo_barras: codigo_barras } });
      if (existingProduto && existingProduto.id !== produto.id) {
        return res.status(409).json({ error: 'Código de Barras já cadastrado para outro produto.' });
      }
    }
    produto.nome = nome !== undefined ? nome : produto.nome;
    produto.descricao = descricao !== undefined ? descricao : produto.descricao;
    produto.preco_venda = preco_venda !== undefined ? preco_venda : produto.preco_venda;
    produto.preco_custo = preco_custo !== undefined ? preco_custo : produto.preco_custo;
    produto.estoque_atual = estoque_atual !== undefined ? estoque_atual : produto.estoque_atual;
    produto.estoque_minimo = estoque_minimo !== undefined ? estoque_minimo : produto.estoque_minimo;
    produto.unidade_medida = unidade_medida !== undefined ? unidade_medida : produto.unidade_medida;
    produto.codigo_barras = codigo_barras !== undefined ? codigo_barras : produto.codigo_barras;
    produto.ncm = ncm !== undefined ? ncm : produto.ncm;
    produto.icms_aliquota = icms_aliquota !== undefined ? icms_aliquota : produto.icms_aliquota;
    produto.ipi_aliquota = ipi_aliquota !== undefined ? ipi_aliquota : produto.ipi_aliquota;
    produto.pis_aliquota = pis_aliquota !== undefined ? pis_aliquota : produto.pis_aliquota;
    produto.cofins_aliquota = cofins_aliquota !== undefined ? cofins_aliquota : produto.cofins_aliquota;
    produto.origem = origem !== undefined ? origem : produto.origem;
    produto.ativo = ativo !== undefined ? ativo : produto.ativo;
    produto.categoria = categoria !== undefined ? categoria : produto.categoria;
    produto.observacoes = observacoes !== undefined ? observacoes : produto.observacoes;
    await produto.save();
    res.status(200).json(produto);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar produto.', details: error.message });
  }
});

app.delete('/api/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await db.Produto.destroy({ where: { id: id } });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.status(200).json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir produto.', details: error.message });
  }
});

// ------------------------------------------------------------
// ROTAS DE CAMINHÕES
// ------------------------------------------------------------
app.post('/api/caminhoes', async (req, res) => {
  const { modelo, placa, cor, capacidade, unidade_capacidade, apelido } = req.body;
  if (!modelo || !placa || capacidade === undefined || unidade_capacidade === undefined) {
    return res.status(400).json({ error: 'Modelo, Placa, Capacidade e Unidade de Capacidade são obrigatórios para o caminhão.' });
  }
  try {
    const novoCaminhao = await db.Caminhao.create({
      modelo, placa, cor, capacidade, unidade_capacidade, apelido
    });
    res.status(201).json(novoCaminhao);
  } catch (error) {
    console.error('Erro ao cadastrar caminhão:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Placa já cadastrada.' });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar caminhão.', details: error.message });
  }
});

app.get('/api/caminhoes', async (req, res) => {
  try {
    const caminhoes = await db.Caminhao.findAll();
    res.status(200).json(caminhoes);
  } catch (error) {
    console.error('Erro ao buscar caminhões:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar caminhões.', details: error.message });
  }
});

app.put('/api/caminhoes/:id', async (req, res) => {
  const { id } = req.params;
  const { modelo, placa, cor, capacidade, unidade_capacidade, apelido } = req.body;
  try {
    const caminhao = await db.Caminhao.findByPk(id);
    if (!caminhao) {
      return res.status(404).json({ error: 'Caminhão não encontrado.' });
    }
    if (placa && placa !== caminhao.placa) {
      const existingCaminhao = await db.Caminhao.findOne({ where: { placa: placa } });
      if (existingCaminhao && existingCaminhao.id !== caminhao.id) {
        return res.status(409).json({ error: 'Placa já cadastrada para outro caminhão.' });
      }
    }
    caminhao.modelo = modelo !== undefined ? modelo : caminhao.modelo;
    caminhao.placa = placa !== undefined ? placa : caminhao.placa;
    caminhao.cor = cor !== undefined ? cor : caminhao.cor;
    caminhao.capacidade = capacidade !== undefined ? capacidade : caminhao.capacidade;
    caminhao.unidade_capacidade = unidade_capacidade !== undefined ? unidade_capacidade : caminhao.unidade_capacidade;
    caminhao.apelido = apelido !== undefined ? apelido : caminhao.apelido;
    await caminhao.save();
    res.status(200).json(caminhao);
  } catch (error) {
    console.error('Erro ao atualizar caminhão:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar caminhão.', details: error.message });
  }
});

app.delete('/api/caminhoes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await db.Caminhao.destroy({ where: { id: id } });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Caminhão não encontrado.' });
    }
    res.status(200).json({ message: 'Caminhão excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir caminhão:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir caminhão.', details: error.message });
  }
});

// ------------------------------------------------------------
// ROTAS DE PEDIDOS DE FORNECEDOR
// ------------------------------------------------------------
// Rota para cadastrar um novo pedido de fornecedor (com seus itens)
app.post('/api/pedidos-fornecedor', async (req, res) => {
  const { data_pedido, fornecedorId, status, itens } = req.body;
  if (!data_pedido || !itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ error: 'Data do pedido e itens são obrigatórios.' });
  }
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const novoPedido = await db.PedidoFornecedor.create({
        data_pedido,
        fornecedorId: fornecedorId || null, // Garante que é null se não for enviado
        status
      }, { transaction: t });

      const itensParaCriar = itens.map(item => ({
        ...item,
        pedidoFornecedorId: novoPedido.id
      }));

      const novosItens = await db.ItemPedidoFornecedor.bulkCreate(itensParaCriar, {
        transaction: t
      });

      return { novoPedido, novosItens };
    });

    res.status(201).json({ pedido: result.novoPedido, itens: result.novosItens });
  } catch (error) {
    console.error('Erro ao cadastrar pedido de fornecedor:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar pedido de fornecedor.', details: error.message });
  }
});

// Rota para obter todos os pedidos de fornecedor (com seus itens e relações)
app.get('/api/pedidos-fornecedor', async (req, res) => {
  try {
    const pedidos = await db.PedidoFornecedor.findAll({
      include: [
        {
          model: db.Fornecedor,
          as: 'fornecedor',
          attributes: ['id', 'nome', 'cpf_cnpj', 'telefone'] // Incluir telefone aqui para o WhatsApp
        },
        {
          model: db.ItemPedidoFornecedor,
          as: 'itens',
          include: [
            { model: db.Produto, as: 'produto', attributes: ['id', 'nome', 'unidade_medida', 'preco_venda', 'preco_custo'] }, // Incluído preco_custo
            { model: db.Cliente, as: 'cliente', attributes: ['id', 'nome'] },
            { model: db.Caminhao, as: 'caminhao', attributes: ['id', 'modelo', 'placa', 'apelido'] },
            { model: db.Fornecedor, as: 'fornecedor', attributes: ['id', 'nome', 'telefone'] } // Adicionado para fornecedor a nível de item, se for usar no futuro
          ]
        }
      ],
      order: [['data_pedido', 'DESC'], ['createdAt', 'DESC']] // Ordena por data mais recente
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos de fornecedor:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar pedidos de fornecedor.', details: error.message });
  }
});

// Rota para obter um pedido de fornecedor por ID (com seus itens e relações)
app.get('/api/pedidos-fornecedor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await db.PedidoFornecedor.findByPk(id, {
      include: [
        {
          model: db.Fornecedor,
          as: 'fornecedor',
          attributes: ['id', 'nome', 'cpf_cnpj', 'telefone'] // Incluir telefone aqui para o WhatsApp
        },
        {
          model: db.ItemPedidoFornecedor,
          as: 'itens',
          include: [
            { model: db.Produto, as: 'produto', attributes: ['id', 'nome', 'unidade_medida', 'preco_venda', 'preco_custo'] }, // Incluído preco_custo
            { model: db.Cliente, as: 'cliente', attributes: ['id', 'nome'] },
            { model: db.Caminhao, as: 'caminhao', attributes: ['id', 'modelo', 'placa', 'apelido'] },
            { model: db.Fornecedor, as: 'fornecedor', attributes: ['id', 'nome', 'telefone'] } // Adicionado para fornecedor a nível de item
          ]
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido de fornecedor não encontrado.' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error('Erro ao buscar pedido de fornecedor por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar pedido de fornecedor.', details: error.message });
  }
});

// Rota para atualizar um pedido de fornecedor (com seus itens)
app.put('/api/pedidos-fornecedor/:id', async (req, res) => {
  const { id } = req.params;
  const { data_pedido, fornecedorId, status, itens } = req.body;

  if (!data_pedido || !itens || !Array.isArray(itens)) { // Removido !fornecedorId daqui
    return res.status(400).json({ error: 'Data do pedido e itens são obrigatórios.' });
  }

  try {
    const result = await db.sequelize.transaction(async (t) => {
      const pedido = await db.PedidoFornecedor.findByPk(id, { transaction: t });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido de fornecedor não encontrado.' });
      }

      // Atualiza o cabeçalho do pedido
      await pedido.update({
        data_pedido,
        fornecedorId: fornecedorId || null, // Garante que é null se não for enviado
        status
      }, { transaction: t });

      // Gerencia os itens: deleta os antigos e cria os novos
      // Isso garante que itens removidos do frontend sejam deletados do BD
      await db.ItemPedidoFornecedor.destroy({
        where: { pedidoFornecedorId: pedido.id },
        transaction: t
      });

      // Cria os novos itens (incluindo os editados e os novos do frontend)
      const itensParaCriar = itens.map(item => ({
        ...item,
        pedidoFornecedorId: pedido.id
      }));

      const novosItens = await db.ItemPedidoFornecedor.bulkCreate(itensParaCriar, {
        transaction: t
      });

      return { pedido, novosItens };
    });

    res.status(200).json({ pedido: result.novoPedido, itens: result.novosItens });
  } catch (error) {
    console.error('Erro ao atualizar pedido de fornecedor:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar pedido de fornecedor.', details: error.message });
  }
});

// Rota para excluir um pedido de fornecedor
app.delete('/api/pedidos-fornecedor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await db.PedidoFornecedor.destroy({
      where: { id: id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Pedido de fornecedor não encontrado.' });
    }
    res.status(200).json({ message: 'Pedido de fornecedor excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir pedido de fornecedor:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir pedido de fornecedor.', details: error.message });
  }
});

// ------------------------------------------------------------
// ROTAS DE PEDIDOS DE CLIENTE (NOVAS ROTAS)
// ------------------------------------------------------------

// Rota para cadastrar um novo pedido de cliente (com seus itens)
// Método: POST
// Endpoint: /api/pedidos-cliente
// Recebe: { clienteId: integer, data_pedido: string, status: string, itens:[]}
// Retorna: O objeto do pedido recém-criado com seus itens
app.post('/api/pedidos-cliente', async (req, res) => {
  const { clienteId, data_pedido, status, itens } = req.body;
  if (!clienteId || !data_pedido || !itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ error: 'Cliente, data do pedido e itens são obrigatórios.' });
  }
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const novoPedido = await db.PedidoCliente.create({
        clienteId,
        data_pedido,
        status
      }, { transaction: t });

      const itensParaCriar = itens.map(item => ({
        ...item,
        pedidoClienteId: novoPedido.id
      }));

      const novosItens = await db.ItemPedidoCliente.bulkCreate(itensParaCriar, {
        transaction: t
      });

      return { novoPedido, novosItens };
    });

    res.status(201).json({ pedido: result.novoPedido, itens: result.novosItens });
  } catch (error) {
    console.error('Erro ao cadastrar pedido de cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar pedido de cliente.', details: error.message });
  }
});

// Rota para obter todos os pedidos de cliente (com seus itens, cliente e produtos)
// Método: GET
// Endpoint: /api/pedidos-cliente
// Retorna: Um array de objetos de pedidos, incluindo itens e suas relações, com cálculo de custo/lucro
app.get('/api/pedidos-cliente', async (req, res) => {
  try {
    const pedidos = await db.PedidoCliente.findAll({
      include: [
        {
          model: db.Cliente,
          as: 'cliente',
          attributes: ['id', 'nome']
        },
        {
          model: db.ItemPedidoCliente,
          as: 'itens',
          include: [
            { model: db.Produto, as: 'produto', attributes: ['id', 'nome', 'unidade_medida', 'preco_venda', 'preco_custo'] }
          ]
        }
      ],
      order: [['data_pedido', 'DESC'], ['createdAt', 'DESC']]
    });

    // Calcular Valor de Custo e Valor de Lucro para cada pedido
    const pedidosComCalculo = pedidos.map(pedido => {
      let valorCusto = 0;
      let valorVendaTotal = 0;

      pedido.itens.forEach(item => {
        const quantidade = parseFloat(item.quantidade) || 0;
        const precoVendaItem = parseFloat(item.preco_unitario) || 0;
        const precoCustoProduto = item.produto ? (parseFloat(item.produto.preco_custo) || 0) : 0;

        valorVendaTotal += (quantidade * precoVendaItem);
        valorCusto += (quantidade * precoCustoProduto);
      });

      const valorLucro = valorVendaTotal - valorCusto;

      return {
        ...pedido.toJSON(), // Converte para JSON para poder adicionar propriedades
        valor_custo_total: valorCusto,
        valor_lucro_total: valorLucro,
        valor_venda_total: valorVendaTotal
      };
    });

    res.status(200).json(pedidosComCalculo);
  } catch (error) {
    console.error('Erro ao buscar pedidos de cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar pedidos de cliente.', details: error.message });
  }
});

// Rota para obter um pedido de cliente por ID (com seus itens, cliente e produtos)
// Método: GET
// Endpoint: /api/pedidos-cliente/:id
// Retorna: O objeto do pedido, incluindo itens e suas relações
app.get('/api/pedidos-cliente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await db.PedidoCliente.findByPk(id, {
      include: [
        {
          model: db.Cliente,
          as: 'cliente',
          attributes: ['id', 'nome']
        },
        {
          model: db.ItemPedidoCliente,
          as: 'itens',
          include: [
            { model: db.Produto, as: 'produto', attributes: ['id', 'nome', 'unidade_medida', 'preco_venda', 'preco_custo'] }
          ]
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido de cliente não encontrado.' });
    }

    // Calcular Valor de Custo e Valor de Lucro para o pedido único
    let valorCusto = 0;
    let valorVendaTotal = 0;

    pedido.itens.forEach(item => {
      const quantidade = parseFloat(item.quantidade) || 0;
      const precoVendaItem = parseFloat(item.preco_unitario) || 0;
      const precoCustoProduto = item.produto ? (parseFloat(item.produto.preco_custo) || 0) : 0;

      valorVendaTotal += (quantidade * precoVendaItem);
      valorCusto += (quantidade * precoCustoProduto);
    });

    const valorLucro = valorVendaTotal - valorCusto;

    res.status(200).json({
      ...pedido.toJSON(),
      valor_custo_total: valorCusto,
      valor_lucro_total: valorLucro,
      valor_venda_total: valorVendaTotal
    });

  } catch (error) {
    console.error('Erro ao buscar pedido de cliente por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar pedido de cliente.', details: error.message });
  }
});

// Rota para atualizar um pedido de cliente (com seus itens)
// Método: PUT
// Endpoint: /api/pedidos-cliente/:id
// Recebe: O ID do pedido na URL, e { clienteId, data_pedido, status, itens } no corpo da requisição
// Retorna: O objeto do pedido atualizado com seus itens
app.put('/api/pedidos-cliente/:id', async (req, res) => {
  const { id } = req.params;
  const { clienteId, data_pedido, status, itens } = req.body;

  if (!clienteId || !data_pedido || !itens || !Array.isArray(itens)) {
    return res.status(400).json({ error: 'Cliente, data do pedido e itens são obrigatórios.' });
  }

  try {
    const result = await db.sequelize.transaction(async (t) => {
      const pedido = await db.PedidoCliente.findByPk(id, { transaction: t });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido de cliente não encontrado.' });
      }

      // Atualiza o cabeçalho do pedido
      await pedido.update({
        clienteId,
        data_pedido,
        status
      }, { transaction: t });

      // Gerencia os itens: deleta os antigos e cria os novos
      await db.ItemPedidoCliente.destroy({
        where: { pedidoClienteId: pedido.id },
        transaction: t
      });

      const itensParaCriar = itens.map(item => ({
        ...item,
        pedidoClienteId: pedido.id
      }));

      const novosItens = await db.ItemPedidoCliente.bulkCreate(itensParaCriar, {
        transaction: t
      });

      return { pedido, novosItens };
    });

    res.status(200).json({ pedido: result.pedido, itens: result.novosItens });
  } catch (error) {
    console.error('Erro ao atualizar pedido de cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar pedido de cliente.', details: error.message });
  }
});

// Rota para excluir um pedido de cliente
// Método: DELETE
// Endpoint: /api/pedidos-cliente/:id
// Recebe: O ID do pedido na URL
// Retorna: Uma mensagem de sucesso
app.delete('/api/pedidos-cliente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await db.PedidoCliente.destroy({
      where: { id: id }
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Pedido de cliente não encontrado.' });
    }
    res.status(200).json({ message: 'Pedido de cliente excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir pedido de cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao excluir pedido de cliente.', details: error.message });
  }
});

// ************************************************************
// INICIALIZAÇÃO DO SERVIDOR
// ************************************************************
db.sequelize.authenticate()
.then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('Não foi possível conectar ao banco de dados:', err);
  process.exit(1);
});