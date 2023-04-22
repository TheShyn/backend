import Joi from "joi"

const SchemaProduct = Joi.object({
    name: Joi.string().required().min(6).message({
        "string.empty": `name should not be empty`,
        "string.min":"name should be at least 6 character"
    }),
    price: Joi.number().required().min(1).message({
        "number.empty": `number Should not be empty`,
        "number.min":"number should be > 1"
    }),
    categoryId: Joi.string().required(),
    img:Joi.string().required(),
    description:Joi.string().required()
    
})
export default SchemaProduct