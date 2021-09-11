const { Loja } = require('../../database/models')

class Controller {
  async lista(req, res) {
    /*
    #swagger.tags = ["Lojas"]
    #swagger.description = "Endpoint para obter uma lista de lojas."
    #swagger.responses[200] = {
      description: "Lista de lojas encontrada com sucesso.",
      schema: { $ref: "#/definitions/Loja"}
    }
    #swagger.responses[404] = {
      description: 'Nenhuma loja encontrada!'
    }
    #swagger.responses[400] = {
        description: 'Desculpe, tivemos um problema com a requisição!'
    }
    
    */
    try {
      const lojas = await Loja.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      })
      res.status(200).json(lojas)
    } catch (erro) {
      res.json({ message: erro.message })
    }
  }
}

const LojaController = new Controller()
module.exports = LojaController
