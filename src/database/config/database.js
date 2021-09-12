require("dotenv-safe").config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

var opcoes;

// Verifica se está executando no Heroku ou localmente, para ativar ou não o SSL.
if (process.env.NODE_ENV == "production") {
  opcoes = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
} else {
  opcoes = {};
}

module.exports = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: opcoes,
};
