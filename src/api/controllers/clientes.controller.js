const { validationResult } = require("express-validator");
const ClienteService = require("../services/clientes.service");
const ProdutosService = require("../services/produtos.service");
const jwt = require("jsonwebtoken");
const JWTSecret = "mulheresincriveisdoluizacode";
const bcrypt = require("bcryptjs");

class Controller {
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
      #swagger.responses[500] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
*/

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome, email, senha } = req.body;
      const senhaCript = bcrypt.hashSync(senha, 10);

      const cadastrado = await ClienteService.fazCadastro({
        nome,
        email,
        senha: senhaCript,
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
      res.status(500).json({ message: erro.message });
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
        description: 'Falha interna'
      }
      #swagger.responses[401] = {
        description: 'Credenciais inválidas'
      }
      #swagger.responses[404] = {
        description: 'E-mail não cadastrado no banco'
      }
            #swagger.responses[500] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
    */

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, senha } = req.body;
      const cliente = await ClienteService.achaCliente({ email });

      let check = bcrypt.compareSync(senha, cliente.senha);

      if (cliente) {
        if (check) {
          jwt.sign(
            { id: cliente.id, email: cliente.email, isAdmin: cliente.isAdmin },
            JWTSecret,
            { expiresIn: "1h" },
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
      res.status(500).json({ message: erro.message });
    }
  }

  async adicionaProduto(req, res) {
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
      #swagger.responses[404] = {
        description: 'Produto não cadastrado no sistema!'
    }
      #swagger.responses[409] = {
        description: 'O carrinho já possui um produto do mesmo tipo!'
    }
      #swagger.responses[500] = {
        description: 'Desculpe, tivemos um problema com a requisição!'
    }
    */

    try {
      const produto = await ProdutosService.achaUm(req.body.id);

      if (!produto) {
        res.status(404).json({
          message: "Uai sô! Produto não cadastrado em nosso sistema!",
        });
      } else {
        const adicionado = await ClienteService.addProduto(
          req.clienteId,
          produto,
        );
        if (adicionado) {
          res
            .status(201)
            .json({ message: "Eba! Produto adicionado no carrinho!" });
        } else {
          res.status(409).json({
            message:
              "Eita! Tu já possui um item desse tipo no seu carrinho, visse?!",
          });
        }
      }
    } catch (erro) {
      res.status(500).json({ message: erro.message });
    }
  }

  async removeProduto(req, res) {
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
       #swagger.responses[404] = {
        description: 'Produto não encontrado em nosso sistema!'
      }
      #swagger.responses[500] = {
        description: 'Desculpe, tivemos um problema com a requisição!'
      }
    */
    try {
      const produto = await ProdutosService.achaUm(req.body.id);
      if (!produto) {
        return res.status(404).json({
          message: "Uai sô! Produto não cadastrado em nosso sistema!",
        });
      }

      const deletado = await ClienteService.delProduto(req.clienteId, produto);
      if (deletado) {
        res
          .status(200)
          .json({ message: "Bah tchê! Produto removido do carrinho!" });
      }
    } catch (erro) {
      res.status(500).json({ message: erro.message });
    }
  }

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
      #swagger.responses[500] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
    */

    try {
      const carrinhoDoCliente = await ClienteService.listaCarrinho(
        req.clienteId,
      );
      res.status(200).json(carrinhoDoCliente);
    } catch (erro) {
      res.status(500).json({ message: erro.message });
    }
  }

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
      #swagger.responses[500] = {
      description: 'Desculpe, tivemos um problema com a requisição'
      } 
    */

    try {
      const carrinho = await ClienteService.compraRealizada(req.clienteId);
      if (!carrinho) {
        return res
          .status(404)
          .json({ message: "Você não possui itens no carrinho!" });
      } else {
        res
          .status(200)
          .json({ message: "Eba! Compra finalizada com sucesso!" });
      }
    } catch (erro) {
      res.status(500).json({ message: erro.message });
    }
  }

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

      #swagger.responses[500] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
    */
    try {
      const pedidosDoCliente = await ClienteService.listaPedidos(req.clienteId);
      res.status(200).json(pedidosDoCliente);
    } catch (erro) {
      res.status(500).json({ message: erro.message });
    }
  }
}

const ClienteController = new Controller();
module.exports = ClienteController;
