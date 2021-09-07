const { Cliente, Pedido, Produto, PedidoProduto, Loja } = require('../../database/models');
const { Op } = require('sequelize');

class Controller {

  /* Lista todos os Clientes */
  async lista(req, res) {
    try {
      const clientes = await Cliente.findAll();
      res.status(200).json(clientes);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  async cadastra(req, res) {
    try {
      const [ cliente, cadastrado ] = await Cliente.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          nome: req.body.nome,
          senha: req.body.senha
        }
      })

      if(cadastrado){
        res.status(200).json({ message: "Cliente cadastrado com sucesso!" });
      } else {
        res.status(200).json({ message: 'Esse e-mail já está cadastrado!'});
      }
    } catch(erro){
      res.status(400).json({ message: erro.message });
    } 
  }

  async criaOuAdiciona(req, res) {
    try {
      const produto = await Produto.findByPk(req.body.id);
      if(!produto) {
        res.status(200).json({ message: 'Produto não cadastrado em nosso sistema!'})
      }
      // Acha um Pedido com status='carrinho' OU cria um novo carrinho
      const [ carrinho, criado ] = await Pedido.findOrCreate({
        where: { 
          id_cliente: req.params.id, 
          status: "carrinho" 
        }
      });
      // Se não existia um carrinho significa que o carrinho está vazio
      if(!criado){
        // Verifica se tem outros produtos do mesmo tipo
        const produtosCarrinho = await carrinho.getProdutos({ where: { tipo: produto.tipo } });
  
        if(produtosCarrinho.length != 0){ // Se produto do mesmo tipo existir no carrinho
          res.status(200).json({ message: 'Ops! Você já possui um item desse tipo no seu carrinho!'})
        }
      }
      // Caso o Pedido tenha sido criado, 
      // ou não exista um produto do mesmo tipo no carrinho.
      await carrinho.addProduto(produto);
      res.status(200).json({ message: 'Produto adicionado no carrinho!'})
  } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  async remove(req, res) {
    // req.params com o idCliente 
    // recebe um req.body do produto
    // tenta achar o produto com status=carrinha
    // se achar-> deleta
    // se não achar msg amigável
    // try{
    //   const produto = await Produto.findByPk(req.body.id);
    //   if(!produto) {
    //     res.status(200).json({ message: 'Esse produto não existe!'});
    //   }



    // } catch(erro){
    //   res.status(400).json({ message: erro.message });
    // }
  }

  async finalizaCompra(req, res) {
    // Faz um Math.random(1, 6) pq temos 6 lojas e em id_loja
    // guarda o nome da loja numa variável
    // pega todos os pedidos com status = 'carrinho'
    // e altera o status para 'realizada'
    // msg de sucesso informando a loja de retirada dos produtos
  }

  async listaPedidos(req, res) {
    //INCOMPLETO PRECISA ATUALIZAR
    try {
      const pedidosDoCliente = await Pedido.findAll({
        where: {
          id_cliente: req.params.id,
          status: {
            [Op.ne]: 'carrinho'
          }
        },
        attributes: {
          exclude: [ "createdAt", "updatedAt" ]
        },
        include: {
          model: Produto,
          through: {
            attributes: []
          },
          attributes: {
            exclude: [ "createdAt", "updatedAt" ]
          }
        }
      });
      res.status(200).json(pedidosDoCliente);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }
}

const ClienteController = new Controller();
module.exports = ClienteController;