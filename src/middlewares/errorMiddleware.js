const errMiddlware = (error, req, res, _next) => {
  console.error(error);
  return res.status(404).json({ message: 'Product not found' });
};

module.exports = errMiddlware;