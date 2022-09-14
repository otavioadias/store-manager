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

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsServices.insertProduct(name);
  res.status(201).json({ id: result.insertId, name });
};

module.exports = { getAllProducts, getProductById, insertProduct };