import Joi from "joi";

export const feedbackSchema = Joi.object({
  user: Joi.string().required().messages({
    "string.empty": "User is not empty",
    "any.required": "User is required",
  }),
  content: Joi.string()
    .min(6)
    .max(120)
    .required()
    .messages({
      "string.empty": "Content is not empty",
      "any.required": "Content is required",
      "string.min": "Content must be at least 6 characters",
      "string.max": "Content must be at most 120 characters",
    }),
    name: Joi.string().required(),
  rate: Joi.number().min(1).required().messages({
    "number.empty": "Rate is not empty",
    "any.required": "Rate is required",
    "number.min": "Rate must be at least 1",
  }),
  status: Joi.number(),
  product: Joi.string().required().messages({
    "string.empty": "Product is not empty",
    "any.required": "Product is required",
  }),
});
