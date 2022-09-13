const express = require('express');

const productRouter = express.Router();

const productsController = require('../controllers/productsControllers');

productRouter.get('/', productsController.getAllProducts);

productRouter.get('/:id', productsController.getProductById);

productRouter.post('/', productsController.insertProduct);

module.exports = productRouter;