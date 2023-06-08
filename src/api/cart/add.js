import connect from "../../config/db";
import Carts from "../../models/Carts";
import { cartsSchema } from "../../validate/SchemaCart";


const addToCart = async (req,res) =>{ 
    const method = req.method
    const data = req.body
    await connect()
    switch (method) {
        case "POST":
            try {
                const { error } = cartsSchema.validate(data)      
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                const simular = await Carts.findOne({userId: data.userId, product: data.product})
                if(simular){
                    const dataUpdate = await Carts.findByIdAndUpdate(simular._id, { quantity: simular.quantity + data.quantity }, { new: true });
                    return res.status(200).send({ message: "Add cart successfully", data: dataUpdate })
                      
                }
                
                const item = await Carts.create(data)
                return res.status(200).send({ message: "Add cart successfully", data: data })
            } catch (error) {
                return res.send({ message: error });
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export default addToCart