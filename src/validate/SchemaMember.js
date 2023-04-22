import Joi from "joi";

export const MemberSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Please enter your username"
    }),
    role: Joi.string().required()
});