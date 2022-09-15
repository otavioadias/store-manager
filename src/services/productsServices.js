const productsModel = require('../models/productsModels');

const getAllProducts = async () => productsModel.getAllProducts();

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (product[0].length === 0) {
     return { type: 404, message: { message: 'Product not found' } };
  }
     return { type: 200, message: product[0][0] };
};

const insertProduct = async (name) => productsModel.insertProduct(name);

const updateProductById = async (name, id) => {
  const [getproduct] = await productsModel.getProductById(id);
  if (getproduct.length === 0) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  await productsModel.updateProductById(name, id);
  return { type: 200, message: { id, name } };
};

const deleteProductById = async (id) => {
  const getproduct = await productsModel.getProductById(id);
  if (getproduct[0].length === 0) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  await productsModel.deleteProductById(id);
  return { type: 204 };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProductById,
  deleteProductById,
};