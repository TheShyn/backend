import mongoose from "mongoose";
import connect from "../../config/db";
import Carts from "../../models/Carts";
import { cartsSchema } from "../../validate/SchemaCart";


const removeCart = async (req,res) =>{ 
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const data = req.body
    const {id} = req.params
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({ message: "Id is not a valid" })
    }
    await connect()
    switch (method) {
        case "DELETE":
            try {
                const cart = await Carts.findOne({_id: id})
                if(!cart){
                    return res.status(400).json({
                        success:false,
                        message: 'Cart not found'
                    })
                }


                await Carts.deleteOne({_id: id})
                return res.status(200).send({message: "Delete cart successfully"})

            } catch (error) {
                return res.send({ message: error });
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export default removeCart