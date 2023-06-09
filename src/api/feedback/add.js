import connect from "../../config/db/index.js"
import FeedBack from "../../models/FeedBack.js"
import { feedbackSchema } from "../../validate/SchemaFeedback.js"

const AddCmt = async (req, res) => {
    await connect()
    const data = req.body
    const { method } = req

    switch (method) {
        case "POST":
            try {
                const {error} = feedbackSchema.validate(data)
                if(error){
                    return res.status(400).send({ message: error.message });
                }
                const comment = await FeedBack.create(data)
                return res.status(200).send({
                    message:"add comment to feedback", 
                    data: comment
                })
            } catch (error) {
                return res.status(500).send({message:error, connect:false})
            }
            break;
        default:
            return res.status(405).send({message:"Method Not Allowed"})
            break;    
    }
}
export default AddCmt
