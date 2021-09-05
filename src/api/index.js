var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ title: 'Ops! Nada por aqui....' });
});

module.exports = router;
