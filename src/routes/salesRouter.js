const express = require('express');

const salesMiddleware = require('../middlewares/salesMiddleware');

const salesRouter = express.Router();
const salesControllers = require('../controllers/salesControllers');

salesRouter.post('/', salesMiddleware, salesControllers.insertSalesProducts);

module.exports = salesRouter;