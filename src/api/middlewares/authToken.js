const jwt = require("jsonwebtoken");
const JWTSecret = "mulheresincriveisdoluizacode";

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];
  const bearer = authToken.split(" ");
  const token = bearer[1];
  if (token != undefined) {
    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.status(401).json("Token inválido!");
      } else {
        req.token = token;
        req.clienteId = data.id;
        req.clienteAdmin = data.isAdmin;
        console.log(data);
        next();
      }
    });
  } else {
    res.status(401).json("Token inválido!");
  }
};

module.exports = auth;
