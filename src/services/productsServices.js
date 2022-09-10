const productsModel = require('../models/productsModels');

const getAllProducts = async () => productsModel.getAllProducts();

const getProductById = async (id) => {
  const [product] = await productsModel.getProductById(id);

  if (!product) {
    return { type: 404, message: { message: 'Product not found' } };
  }

  return { type: 200, message: product };
};

module.exports = { getAllProducts, getProductById };