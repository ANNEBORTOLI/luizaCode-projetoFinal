const { Pedido } = require('../../database/models');

class Controller {

  async retiraPedido(req, res) {
    try{
      // Guarda o Pedido dentro do a ser retirado na variável pedido
      const pedido = await Pedido.findByPk(req.body.id);
      if(!pedido){
        return res.status(200).json({ message: "Esse pedido não existe!"});
      } else {
        if(pedido.status == 'retirado'){
          return res.status(200).json({ message: "Esse pedido já foi retirado!"});
        }
        //Altera o atributo status de 'realizada' para 'retirada'
        pedido.status = 'retirado';
        // Salva a alteração no banco de dados
        await pedido.save();
      res.status(200).json({ message: "Pedido retirado!"});

      } 
    } catch(erro){
      res.status(400).json({ message: erro.message });
    }
  }
}

const PedidosController = new Controller();
module.exports = PedidosController;