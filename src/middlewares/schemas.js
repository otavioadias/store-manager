const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string-empty': 'name is required',
    'string-min': 'name length must be at least 5 characters long',
  }),
});

const salesObject = Joi.object({
  productId: Joi.number().required()
    .messages({
      'number-empty': 'is required',
      'number-valid': 'Product not found',
  }),
  quantity: Joi.number().positive().min(1)
    .required()
    .messages({
    'number-empty': 'is required',
    'number-positive': 'must be greater than or equal to 1',
    'number-min': 'must be greater than or equal to 1',
  }),
});

const salesSchema = Joi.array().items(salesObject);

module.exports = { productSchema, salesSchema };