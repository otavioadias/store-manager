const schemas = require('./schemas');

const productMiddleware = async (req, res, next) => {
  const validation = schemas.productSchema.validate(req.body);
  console.log(validation.error.details[0]);
  if (validation.error) {
  if (validation.error.details[0].type === 'string.min') {
    res.status(422).json({ message: validation.error.details[0].message });
  }
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  next();
};

module.exports = productMiddleware;