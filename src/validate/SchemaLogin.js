import Joi from "joi";

export const loginSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required().messages({
      "string.email": "Email invalid",
      "string.empty": "Email is not empty",
      "string.required": "Email is required",
    }),
    // username: Joi.string().min(6).required().messages({
    //   "string.empty": "Please enter your username",
    //   "string.min": "Name must be at least 6 characters"
    // }),
    password: Joi.string().required().min(6).messages({
      "string.empty": "Password is not empty",
      "any.required": "Password is required",
      "string.min": "Password must have at least {#limit} characters",
    }),
  });
