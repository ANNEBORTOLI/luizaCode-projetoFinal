const { Loja } = require('../../database/models');

class Controller {

  async lista(req, res) {
    try {
      const lojas = await Loja.findAll({
        attributes: {
          exclude: [ "createdAt", "updatedAt" ]
        }
      });
      res.status(200).json(lojas)
    } catch (erro) {
      res.json({ message: erro.message })
    }
  }
}

const LojaController = new Controller();
module.exports = LojaController;