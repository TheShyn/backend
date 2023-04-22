import mongoose from "mongoose";
import connect from "../../../config/db";
import Product from "../../../models/Product";
import Categories from "../../../models/Categories";

const DeleteProduct = async (req, res) => {
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const { id } = req.params
    //check id valid
    if(!ObjectId.isValid(id)){
        return res.status(404).send({message: "Id is not a valid"})
    }
    await connect()
    switch (method) {
        case 'DELETE':
            try {
                const product = await Product.findOne({ _id: new ObjectId(id) })
                if (!product) {
                    return res.status(404).send({ message: "Product not found" })
                }
                await Categories.findOneAndUpdate(
                    { _id: product.categoryId },
                    { $pull: { products: product._id } },
                    { new: true },
                  );

                const deleteProdcut = await Product.deleteOne({_id: new ObjectId(id)})
                return res.status(200).send({message: "Delete product successfully"})
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export default DeleteProduct