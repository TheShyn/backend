import connect from "../../../config/db";
import Categories from "../../../models/Categories"
import mongoose from "mongoose";
import { cateSchema } from "../../../validate/SchemaCate";
const createCate = async function (req, res) {
    const method = req.method
    const { name } = req.body;
    await connect()
    switch (method) {
        case 'POST':
            try {
                const { error } = cateSchema.validate(req.body)
                if (error) {
                    return res.status(400).json({ message: error.details[0].message });
                }
                const isDeclared = await Categories.findOne({ name })
                if (isDeclared) {
                    return res.status(400).json({
                        message: "Category already exists",
                        data: []
                    })
                }
                const category = await Categories.create(req.body);
                if (!category) {
                    return res.status(400).json({
                        message: "Thêm danh muc thất bại",
                        datas: [],
                    });
                }
                return res.status(200).json({
                    message: "Thêm danh muc thành công",
                    data: [category],
                });

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
export default createCate