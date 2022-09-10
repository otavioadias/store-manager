const productsServices = require('../services/productsServices');

const getAllProducts = async (req, res) => {
  const result = await productsServices.getAllProducts();
  res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.getProductById(id);
  res.status(result.type).json(result.message);
};

module.exports = { getAllProducts, getProductById };