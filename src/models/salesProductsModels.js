const connection = require('./connection');

const insertSalesProducts = async (saleId, sale) => {
  sale.forEach(async (s) => {
    const [result] = await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, s.productId, s.quantity],
    );
    return result;
  });
};

module.exports = {
  insertSalesProducts,
};
