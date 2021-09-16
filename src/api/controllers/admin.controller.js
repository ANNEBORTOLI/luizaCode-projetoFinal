const AdminService = require("../services/admin.service");

class Controller {
  async retiraPedido(req, res) {
    /* 
    #swagger.tags = [ "Administrador" ]
    #swagger.description = 'Endpoint que finaliza a entrega do pedido ao cliente, modificando o status da compra para retirado'

    #swagger.parameters['id'] = {
        in: 'body',
        description: 'Id do pedido a ser retirado',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/Id'}
      }
    #swagger.security = [{
        "apiKeyAuth": []
      }]

      #swagger.responses[200] = {
        description: 'Pedido retirado com sucesso'
      }
      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
  */
    try {
      if (req.clienteAdmin != true) {
        return res.status(401).json({
          message: "Usuário não tem autorização para acessar essa rota!",
        });
      }

      const pedidoId = req.body.id;
      const pedido = await AdminService.acheUm(pedidoId);

      if (!pedido) {
        return res.status(404).json({ message: "Esse pedido não existe!" });
      }
      if (pedido.status == "carrinho") {
        return res.status(200).json({
          message:
            "Esse pedido ainda está no seu carrinho! Favor finalizar a compra!",
        });
      }

      if (pedido.status == "retirado") {
        return res.status(200).json({ message: "Pedido já foi retirado!" });
      }

      await AdminService.retira(pedido);
      return res.status(200).json({ message: "Pedido retirado com sucesso!" });
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  /* Lista todos os Clientes */
  async listaClientes(req, res) {
    /*

    #swagger.tags = [ "Administrador" ]
      #swagger.description = 'Endpoints lista todos os clientes cadastrados'
      
      #swagger.security = [{
        "apiKeyAuth": []
      }]

      #swagger.responses[200] = {
        description: 'Clientes encontrados com sucesso'
      }
      #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição'
      }
    */

    // Check se usuário é administrador
    if (req.clienteAdmin != true) {
      return res.status(401).json({
        message: "Usuário não tem autorização para acessar essa rota!",
      });
    }
    try {
      const clientes = await AdminService.listaClientes();
      res.status(200).json(clientes);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  async pedidosCliente(req, res) {
    // Check se usuário é administrador
    if (req.clienteAdmin != true) {
      return res.status(401).json({
        message: "Usuário não tem autorização para acessar essa rota!",
      });
    }
    try {
      const idCliente = req.body.id;
      const pedidosDoCliente = await AdminService.listaPedidosDoCliente(
        idCliente,
      );
      res.status(200).json(pedidosDoCliente);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }
}

const AdminController = new Controller();
module.exports = AdminController;
