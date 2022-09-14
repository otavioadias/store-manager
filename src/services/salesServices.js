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
  const all = await productsModel.getAllProducts();
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
  
module.exports = {
  insertSales,
  insertSalesProducts,
  getAllSales,
  getSaleById,
};