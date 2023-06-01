import connect from "../../../config/db"
import Product from "../../../models/Product"
import mongoose from "mongoose"
import SchemaProduct from "../../../validate/SchemaProduct";
import Categories from "../../../models/Categories";
import dotenv from 'dotenv'
import SchemaProductUpdate from "../../../validate/SchemaProductUpdate";
import { v2 as cloudinary } from 'cloudinary';
dotenv.config()

const UpdateProduct = async (req, res) => {
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const { id } = req.params
    let data = req.body
    const files = req.files
    const imgs = files.map(item=>item?.path)
    
    //check id valid
    if(!ObjectId.isValid(id)){
        return res.status(404).send({message: "Id is not a valid"})
    }
 
    // res.send(data)
    await connect()
    switch (method) {
        case "PATCH":
            try {
                const {categoryId} = data
                let {error} =  SchemaProductUpdate.validate(data)
                if(error){
                    return res.status(400).send({message:error.message});
                }
                const product = await Product.findOne({ _id: new ObjectId(id) })
                if (!product) {
                    return res.status(404).send({ message: "Product not found" });
                }
                const arrayImg = product.imgs.map(item=>{
                    return "products/"+item.split("/").pop().replace('.png', '');
                })                
                const isCate = await Categories.findOne({_id: categoryId})
                if(!isCate) {
                    return res.status(404).send({ message: "Categories not found" });
                }

                if(imgs.length) {
                    data = {
                        ...data,
                        img: imgs[0],
                        imgs:imgs
                    }
                    cloudinary.api.delete_resources(arrayImg)
                }
                const productUpdate = await Product.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data }, { new: true , useFindAndModify: false})
                await Categories.findByIdAndUpdate(categoryId, {
                    $addToSet: {
                        products: id,
                    },
                });
                return res.status(200).send({ message: "Update product successfully", data: productUpdate })
            } catch (error) {
                return res.status(500).send({message:error});
            }

            break;
        default:
            return res.status(404).send({ message: "Invalid method" })
            break;
    }
}
export default UpdateProduct