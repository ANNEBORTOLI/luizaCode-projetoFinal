# Omni Channel - LuizaCode

## Criação dos Endpoints

| EndPoints                            | Método HTTP | Descrição                                 |
| ------------------------------------ | ----------- | ----------------------------------------- |
| [X] `/lojas`                         | `GET`       | `Listar todas as lojas`                   |
| [X] `/produtos`                      | `GET`       | `Listar todos os produtos`                |
| [X] `/cliente`                       | `POST`      | `Cadastrar um cliente`                    |
| [X] `/cliente/:id/carrinho`          | `POST`      | `Add itens ao carrinho`                   |
| [X] `/cliente/:id/carrinho/:produto` | `DELETE`    | `Deleta item carrinho`                    |
| [X] `/cliente/:id/carrinho`          | `GET`       | `Lista produtos no carrinho do cliente`   |
| [X] `/cliente/:id/carrinho`          | `PUT`       | `Conclui compra - "realizada"`            |
| [x] `/cliente/pedidos`               | `GET`       | `Listar todos os Pedidos do Cliente`      |
| [x] `/pedidos/retirar`               | `PUT`       | `Altera status do pedido para "retirada"` |
| [ ] `/login`                         | `POST`      | `Faz login do cliente`                    |

### TODO's

- [x] Implementar middleware de validação do cadastro do cliente (express-validator);
- [] Implementar middleware de validação do login do cliente (express-validator);
- [] Implementar middleware de autenticação com JWT;
- [] Implementar o Swagger;
- [] Deixar o README.md bonitão;
- [] Fazer apresentação do PowerPoint;

## Membros

- [Anne Bortoli](https://github.com/ANNEBORTOLI)
- [Gabriela Tavares](https://github.com/GabiTavaresV)
- [Jaqueline Vieira de Abreu](https://github.com/jaquelineabreu)
- [Rafaela Nakashima](https://github.com/rafanak)
- [Mariana Aguiar](https://github.com/marianadesouzaaguiar)
