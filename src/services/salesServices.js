const salesModels = require('../models/salesModels');
const productsModel = require('../models/productsModels');

const insertSales = async (date) => salesModels.insertSales(date);

const createSales = async () => {
  const date = new Date();

  const sale = await insertSales(date);

  return sale.insertId;
};

const insertSalesProducts = async (sale) => {
  // Array dos id's dos produtos que estão sendo inseridos
  const array = await sale.map((s) => s.productId);
  // Array dos id's dos produtos que estão no banco de dados
  const [all] = await productsModel.getAllProducts();
  const arrayV = all.map((p) => p.id);
  const validate = array.every((s) => arrayV.includes(s));
  if (validate) {
    const id = await createSales();
    await salesModels.insertSalesProducts(id, sale);
    return { type: 201, message: { id, itemsSold: sale } };
   }

   return { type: 404, message: { message: 'Product not found' } };
};
  
const getAllSales = async () => salesModels.getAllSales();

const getSaleById = async (id) => {
  const sale = await salesModels.getSaleById(id);
  if (sale.length === 0) {
    return { type: 404, message: { message: 'Sale not found' } };
  }
  return { type: 200, message: sale };
};

const deleteSaleById = async (id) => {
  const getSale = await salesModels.getSaleById(id);
  if (getSale.length === 0) {
    return { type: 404, message: { message: 'Sale not found' } };
  }
  await salesModels.deleteSaleById(id);
  return { type: 204 };
};

const updateSalesProducts = async (id, sale) => {
  // Array dos id's dos produtos que estão no banco de dados, validação do id da venda
  const all = await salesModels.getAllSales();
  const arrayV = all.map((p) => p.saleId);
  const validateSale = arrayV.some((s) => Number(id) === Number(s));
  // Validação de produto inexistente
  // Array dos id's dos produtos que estão sendo inseridos
  const array = await sale.map((s) => s.productId);
  // Array dos id's dos produtos que estão no banco de dados
  const [allProducts] = await productsModel.getAllProducts();
  const arrayId = allProducts.map((p) => p.id);
  const validate = array.every((s) => arrayId.includes(s));

  if (!validateSale) {
    return { type: 404, message: { message: 'Sale not found' } };
  }
  if (!validate) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  sale.forEach(async (s) => salesModels.updateSalesProducts(id, s.productId, s.quantity));
  return { type: 200, message: { saleId: id, itemsUpdated: sale } };
};
  
module.exports = {
  insertSales,
  insertSalesProducts,
  getAllSales,
  getSaleById,
  deleteSaleById,
  updateSalesProducts,
};