import connect from "../../config/db"
import Users from "../../models/Users"


const getAllUser = async(req,res)=>{
    const method = req.method


    connect()

    switch (method) {
        case "GET":
            try {
                const data = await Users.find({})
                if(!data){
                    return res.status(404).json({
                        message:"Can't not get users",
                        data:[]
                    })
                }
                return res.status(200).json({
                    message:"Get users successfully",
                    data: data
                })
            } catch (error) {
                return res.status(500).json({
                    message:"Not found"
                })
            }
            break;
    
        default:
            break;
    }
}
export default getAllUser