import connect from "../../config/db/index.js"
import FeedBack from "../../models/FeedBack.js"

const GetAll = async (req, res) => {
    await connect()
    const { method } = req

    switch (method) {
        case "GET":
            try {
                const comments = await FeedBack.find()
                return res.status(200).json(comments)
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
