const { Pedido, Cliente } = require("../../database/models");

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
      // Check se usuário é administrador
      if (req.clienteAdmin != true) {
        return res.status(401).json({
          message: "Usuário não tem autorização para acessar essa rota!",
        });
      }
      // Guarda o Pedido dentro do a ser retirado na variável pedido
      const pedido = await Pedido.findByPk(req.body.id);
      if (!pedido) {
        return res.status(200).json({ message: "Esse pedido não existe!" });
      } else {
        if (pedido.status == "retirado") {
          return res
            .status(200)
            .json({ message: "Esse pedido já foi retirado!" });
        }
        //Altera o atributo status de 'realizada' para 'retirada'
        pedido.status = "retirado";
        // Salva a alteração no banco de dados
        await pedido.save();
        res.status(200).json({ message: "Pedido retirado!" });
      }
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }

  /* Lista todos os Clientes */
  async lista(req, res) {

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
      const clientes = await Cliente.findAll();
      res.status(200).json(clientes);
    } catch (erro) {
      res.status(400).json({ message: erro.message });
    }
  }
}

const AdminController = new Controller();
module.exports = AdminController;
