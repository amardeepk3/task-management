const Joi = require('joi');

const taskValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'completed').optional(),
});

module.exports = { taskValidator };
