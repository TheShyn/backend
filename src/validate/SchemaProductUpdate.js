import Joi from "joi"

const SchemaProductUpdate = Joi.object({
    name: Joi.string().required().min(4).message({
        "string.empty": `name should not be empty`,
        "string.min":"name should be at least 4 character"
    }),
    price: Joi.number().required().min(1).message({
        "number.empty": `number Should not be empty`,
        "number.min":"number should be > 1"
    }),
    categoryId: Joi.string().required(),
    description:Joi.string().required(),
    categoryId: Joi.string().required(),
    discount: Joi.number(),
    imgs: Joi.array(),
    status: Joi.string()

    
})
export default SchemaProductUpdate