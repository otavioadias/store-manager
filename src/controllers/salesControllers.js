const salesServices = require('../services/salesServices');

const insertSalesProducts = async (req, res) => {
  const result = await salesServices.insertSalesProducts(req.body);
  res.status(result.type).json(result.message);
};

module.exports = { insertSalesProducts };