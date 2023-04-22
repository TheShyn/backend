import connect from "../../config/db/index.js"
import Product from "../../models/Product.js"

const GetAll = async (req, res) => {
    await connect()
    const { method } = req

    switch (method) {
        case "GET":
            try {
                const product = await Product.find().populate("categoryId");
                return res.status(200).json(product)
            } catch (error) {
                return res.status(500).json({message:error, connect:false})
            }
            break;
        default:
            return res.status(405).json({message:"Method Not Allowed"})
            break;    
    }
}
export default GetAll
