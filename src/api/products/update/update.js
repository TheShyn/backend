import connect from "../../../config/db"
import Product from "../../../models/Product"
import mongoose from "mongoose"
import SchemaProduct from "../../../validate/SchemaProduct";
import Categories from "../../../models/Categories";
import cloudinary from 'cloudinary-core';
import dotenv from 'dotenv'
dotenv.config()

const cloudinaryApi = new cloudinary.Cloudinary({ cloud_name: process.env.CLOUDINARY_NAME });
const UpdateProduct = async (req, res) => {
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const { id } = req.params
    const data = req.body
    //check id valid
    if(!ObjectId.isValid(id)){
        return res.status(404).send({message: "Id is not a valid"})
    }
    // res.send(data)
    await connect()
    switch (method) {
        case "PATCH":
            try {
                const {name, price, categoryId,img} = data
                let {error} =  SchemaProduct.validate(data)
                if(error){
                    return res.status(400).send({message:error.message});
                }
                const product = await Product.findOne({ _id: new ObjectId(id) })
                if (!product) {
                    return res.status(404).send({ message: "Product not found" });
                }
                const isCate = await Categories.findOne({_id: categoryId})
                if(!isCate) {
                    return res.status(404).send({ message: "Categories not found" });
                }
                
                // console.log(img, product.img);
                
                // if(img !== product.img){
                    
                //     const oldImagePublicId = img.split('/').pop().split('.')[0];
                //     console.log(oldImagePublicId)
                //     cloudinaryApi.v2.uploader.destroy(oldImagePublicId, (error, result) => {
                //         if (error) {
                //           console.log(error);
                //         } else {
                //           console.log('Old image deleted:', img);
                //         }
                //       });
                // }
                
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