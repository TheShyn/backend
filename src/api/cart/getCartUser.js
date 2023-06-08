import mongoose from "mongoose";
import connect from "../../config/db";
import Carts from "../../models/Carts";
import { cartsSchema } from "../../validate/SchemaCart";


const getCartUser = async (req,res) =>{ 
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const { id } = req.query;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({ message: "Id is not a valid" })
    }
    await connect()
    switch (method) {
        case "GET":
            try {
                const cart = await Carts.find({ userId: id })
                if(!cart) {
                    return res.status(400).json({
                        success:false,
                        message: 'Cart not found'
                    })
                }         
                return res.status(200).send({ message: "Get cart user successfully", data: cart })
            } catch (error) {
                return res.send({ message: error });
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}

export default getCartUser