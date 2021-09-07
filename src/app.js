const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const clientesRouter = require('./api/routes/clientes.routes');
const produtosRouter = require('./api/routes/produtos.routes');
const lojasRouter = require('./api/routes/lojas.routes');
const pedidosRouter = require('./api/routes/pedidos.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/cliente', clientesRouter);
app.use('/produtos', produtosRouter);
app.use('/lojas', lojasRouter);
app.use('/pedidos', pedidosRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
