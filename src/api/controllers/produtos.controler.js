const { Produto } = require('../../database/models');

class Controller {

  async lista(req, res) {
    /*
    #swagger.tags = ["Produtos"]
    swagger.description = "Endpoint para obter uma lista de produtos."
    swagger.responses[200] = {
      description: "Lista de produtos encontrada com sucesso.",
      schema: { $ref: "#/definitions/Produto"}
    }
    #swagger.responses[404] = {
      description: 'Nenhum produto encontrado!'
    }
    #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição!'
    }
    
    */
    try {
      const produtos = await Produto.findAll({
        attributes: {
          exclude: [ "createdAt", "updatedAt" ]
        }
      });
      res.status(200).json(produtos)
    } catch (erro) {
      res.json({ message: erro.message })
    }
  }
}

const ProdutoController = new Controller();
module.exports = ProdutoController;