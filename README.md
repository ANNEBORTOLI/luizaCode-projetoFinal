# Projeto Final: Omni Channel - Luiza<code>

## Membros

- Tarefas do Domingo:

- [] Popular o BD com seeders;
  sequelize seed:generate --name users
  sequelize seed:generate --name lojas
  sequelize seed:generate --name produtos

- [] Criar Endpoints

| EndPoints                        | Método HTTP | Descrição                                 |
| -------------------------------- | ----------- | ----------------------------------------- |
| `/lojas`                         | `GET`       | `Listar todas as lojas`                   |
| `/produtos`                      | `GET`       | `Listar todos os produtos`                |
| `/cliente`                       | `POST`      | `Cadastrar um cliente`                    |
| `/cliente/:id/carrinho`          | `GET`       | `Listar itens carrinho`                   |
| `/cliente/:id/carrinho`          | `POST`      | `Add itens ao carrinho`                   |
| `/cliente/:id/carrinho`          | `PUT`       | `Conclui compra - "realizada"`            |
| `/cliente/:id/carrinho/:produto` | `DELETE`    | `Deleta item carrinho`                    |
| `/vendedor`                      | `PUT`       | `Altera status da compra para "retirada"` |

- [Anne Bortoli](https://github.com/ANNEBORTOLI)
- [Gabriela Tavares](https://github.com/GabiTavaresV)
- [Jaqueline Vieira de Abreu](https://github.com/jaquelineabreu)
- [Rafaela Nakashima](https://github.com/rafanak)
- [Mariana Aguiar](https://github.com/marianadesouzaaguiar)
