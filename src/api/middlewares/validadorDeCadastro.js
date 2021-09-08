const { check } = require('express-validator');

const validadorDeCadastro = [
  check('nome')
    .notEmpty().withMessage('Campo nome não pode ser vazio').bail()
    .isLength({ min: 3 }).withMessage('Campo nome deve conter no mínimo 3 caracteres'),
  check('email')
    .notEmpty().withMessage('Campo e-mail deve ser preenchido!').bail()
    .isEmail().withMessage('Deve inserir um e-mail válido'),
  check('senha')
    .notEmpty().withMessage('Deve preencher a senha').bail()
    .isLength({ min: 3 }).withMessage('A senha deve ter no mínimo 5 caracteres')
];

module.exports = { validadorDeCadastro }