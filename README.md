# Omni Channel - LuizaCode

## Instruções para atualizar tabela de Clientes com Coluna Admin

1 - [] Rodar a migration com a alteração na tabela Cliente:
$ npm run migrate OU $ sequelize db:migrate

2 - [] Rodar a seed de clientes para acrescentar um Administrador:
$ sequelize db:seed --seed 20210905182117-clientes

3 - [] No Insomnia trocar as seguintes rotas:
° Listar Clientes --> http://localhost:3000/admin/clientes
° Retirar Produto em Loja --> http://localhost:3000/admin/pedidos/retirada

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
| [x] `/login`                         | `POST`      | `Faz login do cliente`                    |

### TODO's

- [x] Iniciar projeto e estruturação MVC
- [x] Instalação e implementação do bd com do Sequelize
- [x] Criação de migrations e seeders
- [x] Criação dos Endpoins
- [x] Implementar middleware de validação do cadastro do cliente (express-validator);
- [x] Implementar middleware de validação do login do cliente (express-validator);
- [x] Implementar middleware de autenticação com JWT;
- [] Implementar o Swagger;
- [] Deixar o README.md bonitão;
- [] Fazer apresentação do PowerPoint;

### Endpoints que o usuário precisa estar autenticado para acessar:

1. Add produto ao carrinho,
2. Remove produto do carrinho,
3. Lista carrinho do cliente;
4. Finaliza Compra;
5. Lista pedidos do cliente;

# Mensagens de Erro

- [] Produto não encontrado: "Uai sô! Produto não cadastrado em nosso sistema!"
- [] Carrinho Add item: "Eba! Produto adicionado no carrinho!"
- [] Carrinho Remove item: "Bah tchê! Produto removido do carrinho!"
- [] Carrinho Produto Repetido: "Eita! Tu já possui um item desse tipo no seu carrinho, visse!"
- [] Finaliza compra: "Massa! Compra finalizada com sucesso!"
- [] Cadastro OK: "Trilegal! Cliente cadastrado com sucesso!"
- [] Cadastro NotOk: "Uai sô! Esse e-mail já está cadastrado em nosso sistema!"

## Membros

- [Anne Bortoli](https://github.com/ANNEBORTOLI)
- [Gabriela Tavares](https://github.com/GabiTavaresV)
- [Jaqueline Vieira de Abreu](https://github.com/jaquelineabreu)
- [Rafaela Nakashima](https://github.com/rafanak)
- [Mariana Aguiar](https://github.com/marianadesouzaaguiar)
