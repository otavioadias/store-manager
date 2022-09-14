const schemas = require('./schemas');

const productMiddleware = async (req, res, next) => {
  const validation = schemas.productSchema.validate(req.body);
  if (validation.error) {
  if (validation.error.details.type === 'string.min') {
    res.status(422).json({ message: validation.error.details.message });
  }
    return res.status(400).json({ message: validation.error.details.message });
  }
  next();
};

module.exports = productMiddleware;