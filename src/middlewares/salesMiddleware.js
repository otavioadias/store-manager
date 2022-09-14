const schemas = require('./schemas');

const salesMiddleware = async (req, res, next) => {
  const salesArray = req.body;
  const validation = schemas.salesSchema.validate(salesArray);
  if (validation.error) {
    if (validation.error.details[0].type === 'number.min'
      || validation.error.details[0].type === 'number.positive') {
      return res.status(422).json({
        message: `"${validation.error.details[0].path[1]}" must be greater than or equal to 1`,
      });
    }
    return res.status(400)
      .json({ message: `"${validation.error.details[0].path[1]}" is required` });
  }
 
  next();
};

module.exports = salesMiddleware;
