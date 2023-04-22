import connect from "../../../config/db";
import Categories from "../../../models/Categories"
import mongoose from "mongoose";
import { cateSchema } from "../../../validate/SchemaCate";
const updateCate = async function (req, res) {
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({ message: "Id is not a valid" })
    }
    await connect()
    switch (method) {
        case 'PATCH':
            try {
                const { error } = cateSchema.validate(req.body)
                if (error) {
                    return res.status(400).json({ message: error.message });
                }
                const { name } = req.body
                const data = await Categories.findOne({ _id: id })
                // return res.status(200).json({
                //     message: "Get categories successfully",
                //     data: data
                // }) 
                if (!data) {
                    return res.status(400).json({
                        message: 'Category not found'
                    })
                }
                
                if(name !== data.name){
                    const isNameReady = await Categories.findOne({name})
                    if(isNameReady) {
                        return res.status(400).json({ message: "Categories is exists" })
                    }

                }
                // const isDeclared = await Categories.find({
                //     name: name,
                //     $ne: { name: data.name }
                // })
                // // return res.status(400).json({ message: "Categories is exists" })
                // if (isDeclared) {
                // }
                const cateUpdate = await Categories.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, useFindAndModify: false })

                return res.status(200).json({
                    message: "Update categories successfully",
                    data: cateUpdate
                })

            } catch (error) {
                return res.status(500).json({
                    message: "Error getting categories"
                })
            }
            break;

        default:
            return res.status(404).json({
                message: "Not found"
            })
            break;
    }
}
export default updateCate