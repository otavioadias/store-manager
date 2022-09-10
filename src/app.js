const express = require('express');

const routes = require('./routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products/:id', routes.productRouterId);
app.use('/products', routes.productRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo server.js para executar sua aplicação 
module.exports = app;