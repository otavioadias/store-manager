const express = require('express');

const productRouterId = express.Router();

const productsController = require('../controllers/productsControllers');

productRouterId.get('/:id', productsController.getProductById);

module.exports = productRouterId;