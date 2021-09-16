const { Loja } = require("../../database/models");

class Service {
  async lista() {
    const lojas = await Loja.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return lojas;
  }
}

const LojasService = new Service();
module.exports = LojasService;
