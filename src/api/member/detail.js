import mongoose from "mongoose";
import connect from "../../config/db"
import Users from "../../models/Users"


const getDetailUser = async(req,res)=>{
    const { ObjectId } = mongoose.Types;
    const method = req.method

    const {id}= req.params
    if(!ObjectId.isValid(id)){
        return res.status(404).send({message: "Id is not a valid"}) 
    }
    connect()

    switch (method) {
        case "GET":
            try {
                const data = await Users.findOne({_id: id})
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
export default getDetailUser