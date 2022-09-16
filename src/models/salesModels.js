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
    await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [saleId, s.productId, s.quantity],
    );
  });
  return true;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity 
    FROM sales
    INNER JOIN sales_products AS sp ON sp.sale_id = sales.id
    ORDER BY sale_id, product_id`,
  );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM sales
    INNER JOIN sales_products AS sp ON sp.sale_id = sales.id
    WHERE sale_id = ?
    ORDER BY sale_id, product_id;`,
    [id],
  );
  return result;
};

const deleteSaleById = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return true;
};

module.exports = {
  insertSales,
  insertSalesProducts,
  getAllSales,
  getSaleById,
  deleteSaleById,
};