const express = require('express');

const salesMiddleware = require('../middlewares/salesMiddleware');

const salesRouter = express.Router();
const salesControllers = require('../controllers/salesControllers');

salesRouter.post('/', salesMiddleware, salesControllers.insertSalesProducts);
salesRouter.get('/', salesControllers.getAllSales);
salesRouter.get('/:id', salesControllers.getSaleById);

module.exports = salesRouter;