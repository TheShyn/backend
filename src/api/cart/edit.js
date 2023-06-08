import mongoose from "mongoose";
import connect from "../../config/db";
import Carts from "../../models/Carts";
import { cartsSchema } from "../../validate/SchemaCart";


const editCart = async (req,res) =>{ 
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const { id } = req.params
    let {quantity} = req.body
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({ message: "Id is not a valid" })
    }
    await connect()
    switch (method) {
        case "PATCH":
            try {
                if(quantity <= 0) {
                    return res.status(400).json({
                        success:false,
                        message: 'Cart not found'
                    })
                }
                const data = await Carts.findOne({ _id: id })
                if(!data){
                    return res.status(400).json({
                        success:false,
                        message: 'Cart not found'
                    })
                }
                const dataUpdate = await Carts.findByIdAndUpdate(id, { quantity }, { new: true });   

                return res.status(200).send({ message: "Update cart successfully", data: dataUpdate })
            } catch (error) {
                return res.send({ message: error });
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}

export default editCart