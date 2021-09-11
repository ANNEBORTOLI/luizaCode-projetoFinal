const { Cliente, Pedido, Produto } = require("../../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWTSecret = "mulheresincriveisdoluizacode";

class Controller {
  /* Cadastra Clientes */
  async cadastra(req, res) {

     /*
      #swagger.tags = [ "Clientes" ]
      #swagger.description = "Endpoint para cadastro de cliente",
      #swagger.parameters['Cadastro'] = {
        in: 'body',
        description: 'Informações para realização do cadastro',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/NovoCliente'}
        }

      #swagger.responses[200] = {
        description: 'E-mail já possui cadastro no banco'
      }
      #swagger.responses[201] = {
        description: 'Cadastro realizado com sucesso'
      }
      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
*/

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const [cliente, cadastrado] = await Cliente.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          nome: req.body.nome,
          senha: req.body.senha,
        },
      });

      if (cadastrado) {
        res
          .status(201)
          .json({ message: "Trilegal! Cliente cadastrado com sucesso!" });
      } else {
        res.status(200).json({
          message: "Uai sô! Esse e-mail já está cadastrado em nosso sistema!",
        });
      }
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  /* Cria um carrinho e ou Adiciona item no carrinho do Clientes */
  async criaOuAdiciona(req, res) {
    /*

    #swagger.tags = [ "Clientes" ]
      #swagger.description = "Endpoint para adicionar um novo produto ao carrinho do cliente",
      #swagger.parameters['id'] = {
          in: 'body',
          description: 'Id do produto adicionado ao carrinho',
          required: true,
          type: 'object',
          schema: { $ref: '#/definitions/Id'}
        }

      #swagger.security = [{
        "apiKeyAuth": []
      }]
      #swagger.responses[201] = {
        description: 'Produto adicionado ao carrinho com sucesso!'
    }
      #swagger.responses[200] = {
        description: 'O carrinho já possui um produto do mesmo tipo!'
    }
      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição!'
    }
    */

    try {
      // Tenta achar um produto com o id enviado.
      const produto = await Produto.findByPk(req.body.id);

      // Se o produto não foi encontrado
      if (!produto) {
        res.status(200).json({
          message: "Uai sô! Produto não cadastrado em nosso sistema!",
        });
      } else {
        // Acha um Pedido com status='carrinho' OU cria um novo pedido
        const [carrinho, criado] = await Pedido.findOrCreate({
          where: {
            id_cliente: req.clienteId,
            status: "carrinho",
          },
        });

        // Se não existia um carrinho significa que o carrinho está vazio
        if (criado) {
          await carrinho.addProduto(produto);
          res
            .status(201)
            .json({ message: "Eba! Produto adicionado no carrinho!" });
        } else {
          // Verifica se tem outros produtos do mesmo tipo
          const produtosCarrinho = await carrinho.getProdutos({
            where: { tipo: produto.tipo },
          });

          // Se produto do mesmo tipo existir no carrinho
          if (produtosCarrinho.length != 0) {
            res.status(200).json({
              message:
                "Eita! Tu já possui um item desse tipo no seu carrinho, visse?!",
            });
            // ou não existia um produto do mesmo tipo no carrinho.
          } else {
            await carrinho.addProduto(produto);
            res
              .status(201)
              .json({ message: "Eba! Produto adicionado no carrinho!" });
          }
        }
      }
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  /* Remove item do carrinho do Cliente */
  async remove(req, res) {
      /*
      #swagger.tags = [ "Clientes" ]
      #swagger.description = "Endpoint para excluir um produto do carrinho do cliente"
      #swagger.parameters['id'] = {
        in: 'body',
        description: 'Id do produto a ser excluído',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/Id'}
      }

      #swagger.security = [{
        "apiKeyAuth": []
      }]
     #swagger.responses[200] = {
        description: 'Produto excluído do carrinho com sucesso! '
      }

      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição!'
      }
    */
    try {
      // Encontra o carrinho na tabela Pedidos
      const carrinho = await Pedido.findOne({
        where: {
          id_cliente: req.clienteId,
          status: "carrinho",
        },
      });
      // Pega o produto que quer deletar pelo id
      const produto = await Produto.findByPk(req.body.id);
      if (!produto) {
        return res.status(200).json({
          message: "Uai sô! Produto não cadastrado em nosso sistema!",
        });
      }
      // Remove o produto do carrinho
      await carrinho.removeProduto(produto);
      res
        .status(200)
        .json({ message: "Bah tchê! Produto removido do carrinho!" });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  /* Lista os produtos no carrinho do cliente */
  async listaCarrinho(req, res) {

       /*
      #swagger.tags = ['Clientes']
      #swagger.description = 'Endpoint para obter a lista dos produtos que se encontram no carrinho do cliente' 

      #swagger.security = [{
        "apiKeyAuth": []
      }]

      #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Carrinho"},
        description: 'Carrinho encontrado com sucesso'
    }
      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
    */

    try {
      const carrinhoDoCliente = await Pedido.findAll({
        where: {
          id_cliente: req.clienteId,
          status: "carrinho",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Produto,
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      res.status(200).json(carrinhoDoCliente);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  /* Finaliza compra do Cliente status='realizada' */
  async finalizaCompra(req, res) {

       /*
      #swagger.tags = [ "Clientes" ]
      #swagger.description = 'Endpoint que conclui a compra do cliente, modificando o status da compra para realizada'
      
      #swagger.security = [{
        "apiKeyAuth": []
      }]

      #swagger.responses[200] = {
        description: 'Compra realizada com sucesso'
      }
      #swagger.responses[400] = {
      description: 'Desculpe, tivemos um problema com a requisição'
      } 
    */

    try {
      // Gera um id aleatório de 1-6 pq temos 6 lojas
      const idLoja = Math.floor(Math.random() * 6 + 1);
      // Pega o carrinho o cliente
      const carrinho = await Pedido.findOne({
        where: {
          id_cliente: req.clienteId,
          status: "carrinho",
        },
      });

      // Altera status e inclui um id de loja.
      carrinho.id_loja = idLoja;
      carrinho.status = "realizada";
      // Salva alterações no banco
      await carrinho.save();
      res.status(200).json({ message: "Eba! Compra finalizada com sucesso!" });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  /* Lista todos os Pedidos e Produtos do Clientes */
  async listaPedidos(req, res) {
      /*
      #swagger.tags = ['Clientes']
      #swagger.description = 'Endpoint para obter a lista de todos os pedidos realizados do cliente' 
      #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Pedido"},
        description: 'Pedidos encontrados'
      }

      #swagger.security = [{
        "apiKeyAuth": []
      }]

      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
    */
    try {
      const pedidosDoCliente = await Pedido.findAll({
        where: {
          id_cliente: req.clienteId,
          status: {
            [Op.ne]: "carrinho",
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Produto,
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      res.status(200).json(pedidosDoCliente);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  async login(req, res) {

    /*
    #swagger.tags = [ "Clientes" ]
      #swagger.description = "Endpoint de login do cliente",
      #swagger.parameters['Login'] = {
        in: 'body',
        description: 'Informações para realização do login',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/LoginCliente'}
      }

       #swagger.responses[200] = {
        description: 'Login realizado com sucesso'
      }
      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
      #swagger.responses[401] = {
        description: 'Credenciais inválidas'
      }
      #swagger.responses[404] = {
        description: 'E-mail não cadastrado no banco'
      }

    */

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, senha } = req.body;
      //Procura um cliente no cadastrado no banco de dados
      const cliente = await Cliente.findOne({
        where: {
          email: email,
        },
      });

      if (cliente) {
        if (cliente.senha == senha) {
          jwt.sign(
            { id: cliente.id, email: cliente.email, isAdmin: cliente.isAdmin },
            JWTSecret,
            { expiresIn: "24h" },
            (err, token) => {
              if (err) {
                res.status(400).json("Falha interna!");
              } else {
                res.status(200).json({ token: token });
              }
            },
          );
        } else {
          res.status(401).json({ message: "Credenciais inválidas!" });
        }
      } else {
        res.status(404).json({ message: "E-mail não cadastrado no banco!" });
      }
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }
}

const ClienteController = new Controller();
module.exports = ClienteController;
