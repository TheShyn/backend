import Joi from "joi";

export const cateSchema = Joi.object({
    name: Joi.string().min(6).required().messages({
      "string.empty": "Please enter your username",
      "string.min": "Name must be at least 6 characters"
    }),
    products:Joi.array()
  });
