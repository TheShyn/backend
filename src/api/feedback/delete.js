import connect from "../../config/db/index.js";
import FeedBack from "../../models/FeedBack.js";

const DeleteCmt = async (req, res) => {
    await connect()
    const { method } = req
    const {id}= req.params
    switch (method) {
        case "DELETE":
            try {
                const comment = await FeedBack.findOne({_id:id})
                if(!comment){
                    return res.status(400).send({ message: "Comment not found" });
                    
                }
                await FeedBack.deleteMany({_id:id})

                return res.status(200).send({
                    message: "deleted successfully"
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
export default DeleteCmt
