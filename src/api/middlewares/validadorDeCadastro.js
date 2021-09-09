const { check } = require("express-validator");

const validadorDeCadastro = [
    check("nome")
        .notEmpty().withMessage("Nome é obrigatório").bail()
        .isLength( { min:3 }).withMessage("Campo nome deve conter no minímo 3 caracteres"),
    check("email")  
        .notEmpty().withMessage("Email é obrigatório!").bail()  
        .isEmail().withMessage("O email deve ser válido!"),
    check("senha")
        .notEmpty().withMessage("Campo senha é obrigatório!").bail()
        .isLength( { min:5 }).withMessage("Campo senha deve conter no minímo 5 caracteres")
 ];



 module.exports = { validadorDeCadastro };