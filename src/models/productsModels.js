const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );
  return result;
};

const insertProduct = async (name) => {
  const [result] = await connection
    .execute('INSERT INTO products (name) VALUES (?)', [name]);
  return result;
};

module.exports = { getAllProducts, getProductById, insertProduct };