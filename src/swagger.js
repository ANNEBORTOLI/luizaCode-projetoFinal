const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointFiles = ['./src/app.js']
const doc = {
  info: {
    version: '1.0.0',
    title: 'Luiza<Code> OmniChannel API - Grupo Bertha Lutz',
    description:
      'Desafio final da 3ª Edição do Luiza<Code>. Desenvolvimento de um serviço HTTP resolvendo a funcionalidade de OmniChannel do cliente',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Clientes',
      description: 'Endpoints relacionados ao recurso de usuário',
    },
    {
      name: 'Produtos',
      description: 'Endpoints relacionados ao recurso de produto',
    },
    {
      name: 'Lojas',
      description: 'Endpoints relacionados ao recurso de loja',
    },
    {
      name: 'Administrador',
      description: 'Endpoints relacionados ao recurso de pedidos',
    },
  ],
  definitions: {
    Produto: {
      nome: 'Tequila Gran Patron Anejo 750 Ml',
      marca: 'Patron Anejo',
      categoria: 'Destilados, licores e coquetéis',
      tipo: 'bebidas',
      preco: 5099.15,
    },
    Loja: {
      id: 1,
      nome: 'Magalu Norte-Nordeste',
    },
    Cliente: {
      nome: 'Bertha Lutz',
      email: 'berthalutz@email.com',
      senha: '12345',
    },
    NovoCliente: {
      $nome: 'Maria da Penha',
      $email: 'mpenha@email.com',
      $senha: '12345',
    },
    LoginCliente: {
      $email: 'berthalutz@email.com',
      $senha: '12345',
    },
    Pedido: {
      id: 4,
      status: 'retirado',
      id_cliente: 1,
      id_loja: 6,
      Produtos: [
        {
          id: 9,
          nome: 'Vodka Crystal Head Aurora 750 Ml',
          marca: 'Absolut',
          categoria: 'Destilados, licores e coquetéis',
          tipo: 'bebidas',
          preco: 898,
        },
      ],
    },
    Carrinho: {
      id: 4,
      status: 'carrinho',
      id_cliente: 1,
      id_loja: 6,
      Produtos: [
        {
          nome: 'Vodka Crystal Head Aurora 750 Ml',
          marca: 'Absolut',
          categoria: 'Destilados, licores e coquetéis',
          tipo: 'bebidas',
          preco: 898,
        },
      ],
    },
    Id: {
      id: 1,
    },
  },
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Insira seu token para garantir acesso aos endpoints',
    },
  },
}

swaggerAutogen(outputFile, endpointFiles, doc)
