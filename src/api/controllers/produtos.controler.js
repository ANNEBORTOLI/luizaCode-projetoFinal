const { Produto } = require('../../database/models');

class Controller {

  async lista(req, res) {
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