import connect from "../../config/db/index.js"
import FeedBack from "../../models/FeedBack.js"
import Product from "../../models/Product";
import { feedbackSchema } from "../../validate/SchemaFeedback.js"

const getCmtOfProduct = async (req, res) => {
    await connect()
    const { method } = req
    const {id}= req.params
    switch (method) {
        case "GET":
            try {
                const data = await Product.findOne({_id: id})
                if(!data){
                    return res.status(400).send({ message: "Product not found" });
                }
                const comment = await FeedBack.find({product:id})
                if(!comment){
                    return res.status(400).send({ message: "Chưa có đánh giá" });
                    
                }

                return res.status(200).send(comment)
            } catch (error) {
                return res.status(500).send({message:error, connect:false})
            }
            break;
        default:
            return res.status(405).send({message:"Method Not Allowed"})
            break;    
    }
}
export default getCmtOfProduct
