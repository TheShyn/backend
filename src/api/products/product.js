import connect from "../../config/db"
import Product from "../../models/Product"
import mongoose from "mongoose"

const getDetail = async (req,res)=>{
    const { ObjectId } = mongoose.Types;
    const {id} = req.params
    const method = req.method
    if(!ObjectId.isValid(id)){
        return res.status(404).send({message: "Id is not a valid"}) 
    }
    await connect()
    switch(method){
        case "GET":
            try {
                const product = await Product.findOne({ _id: new ObjectId(id) }).populate("categoryId");
                if(!product){
                    return res.status(404).send({message: "Product not found"})
                }
                return res.status(200).send({message: "Get product successfully",data: product})
            } catch (error) {
                return res.status(500).send({message: error})
            }
            break;
        default :
            return res.status(404).send({message: "Method not found"})
            break;
    }
}
export default getDetail