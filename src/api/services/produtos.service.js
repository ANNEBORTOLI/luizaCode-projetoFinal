const { Produto } = require("../../database/models");

class Service {
  async lista() {
    const produtos = await Produto.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return produtos;
  }

  async achaUm(id) {
    const produto = await Produto.findByPk(id);
    return produto;
  }
}

const ProdutosService = new Service();
module.exports = ProdutosService;
