import mongoose from "mongoose";
import Users from "../../../models/Users";
import connect from "../../../config/db";
import { MemberSchema } from "../../../validate/SchemaMember.js";
import FeedBack from "../../../models/FeedBack";


const updateUser = async(req,res)=>{
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const obj = req.body
    const {id}= req.params
    if(!ObjectId.isValid(id)){
        return res.status(404).send({message: "Id is not a valid"}) 
    }
    connect()

    switch (method) {
        case "PATCH":
            try {
                const { error } = MemberSchema.validate(req.body)
                if (error) {
                    return res.status(400).json({ message: error.message });
                }
                const user = await Users.findOne({_id: id})
                if(!user){
                    return res.status(404).json({
                        message:"Can't not get users",
                        data:[]
                    })
                }
                
                const cateUpdate = await Users.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true, useFindAndModify: false })
                if(obj.status === "disabled"){
                    await FeedBack.updateMany({user:id}, {status: "disabled"})
                }else{
                    await FeedBack.updateMany({user:id}, {status: "enabled"})
                }
                return res.status(200).json({
                    message:"Update users successfully",
                    data: cateUpdate
                })
            } catch (error) {
                return res.status(500).json({
                    message:"Not found"
                })
            }
            break;
    
        default:
            return res.status(404).json({
                message: "Not found"
            })
            break;
    }
}
export default updateUser