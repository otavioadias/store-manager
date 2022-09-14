const connection = require('./connection');

const insertSales = async (date) => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  return result;
};

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
  insertSales,
  insertSalesProducts,
};