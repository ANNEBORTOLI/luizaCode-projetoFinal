const { check } = require("express-validator");

const validadorDeLogin = [
    check("email")  
        .notEmpty().withMessage("Email é obrigatório!").bail()  
        .isEmail().withMessage("O email deve ser válido!"),
    check("senha")
        .notEmpty().withMessage("Campo senha é obrigatório!").bail()
       
 ];



 module.exports = { validadorDeLogin };