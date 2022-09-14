const express = require('express');

const salesMiddleware = require('../middlewares/salesMiddleware');

const salesRouter = express.Router();
const salesControllers = require('../controllers/salesControllers');
// const salesProductsControllers = require('../controllers/salesProductsControllers');

salesRouter.post('/', salesMiddleware, salesControllers.insertSalesProducts);

// salesRouter.post('/', salesMiddleware, salesProductsControllers.insertSalesProducts);

module.exports = salesRouter;