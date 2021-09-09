const { check } = require('express-validator');

const validadorDeLogin = [
  check('email')
    .notEmpty().withMessage('Campo e-mail é obrigatório!').bail()
    .isEmail().withMessage('Deve inserir um e-mail válido'),
  check('senha')
    .notEmpty().withMessage('Deve preencher a senha').bail()
];

module.exports = { validadorDeLogin }