const express = require('express');
const productMiddleware = require('../middlewares/productMiddleware');

const productRouter = express.Router();

const productsController = require('../controllers/productsControllers');

productRouter.get('/', productsController.getAllProducts);

productRouter.get('/:id', productsController.getProductById);

productRouter.post('/', productMiddleware, productsController.insertProduct);

module.exports = productRouter;