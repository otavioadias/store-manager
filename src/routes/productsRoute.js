const express = require('express');

const productRouter = express.Router();

const productsController = require('../controllers/productsControllers');

productRouter.get('/:id', productsController.getProductById);
productRouter.get('/', productsController.getAllProducts);

module.exports = productRouter;