const salesControllers = require('./salesControllers');
const salesProductsServices = require('../services/salesProductsServices');

const insertSalesProducts = async (req, res) => {
  const sale = await salesControllers.insertSales();
  const result = await salesProductsServices.insertSalesProducts(req.body, sale.id);
  res.status(result.type).json(result.message);
};

module.exports = { insertSalesProducts };