const salesProductsModels = require('../models/salesProductsModels');
const productsModel = require('../models/productsModels');

const insertSalesProducts = async (sale, saleId) => {
  // Array dos id's dos produtos que estão sendo inseridos
  const array = await sale.map((s) => s.productId);
  // Array dos id's dos produtos que estão no banco de dados
  const all = await productsModel.getAllProducts();
  const arrayV = all.map((p) => p.id);
  const validate = array.every((s) => arrayV.includes(s));

  if (validate) {
    await salesProductsModels.insertSalesProducts(saleId, sale);
    console.log(saleId);
    return { type: 201, message: { id: saleId, itemsSold: sale } };
   }

   return { type: 404, message: { message: 'Product not found' } };
  };
  
module.exports = {
  insertSalesProducts,
};