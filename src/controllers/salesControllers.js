const salesServices = require('../services/salesServices');

const insertSalesProducts = async (req, res) => {
  const result = await salesServices.insertSalesProducts(req.body);
  res.status(result.type).json(result.message);
};

const getAllSales = async (req, res) => {
  const result = await salesServices.getAllSales();
  res.status(200).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.getSaleById(id);
  res.status(result.type).json(result.message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.deleteSaleById(id);
  res.status(result.type).json(result.message);
};

module.exports = {
  insertSalesProducts,
  getAllSales,
  getSaleById,
  deleteSaleById,
};