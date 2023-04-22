import mongoose from "mongoose";
import connect from "../../../config/db";
import Users from "../../../models/Users";



const deleteUser = async function (req, res) {
    const { ObjectId } = mongoose.Types;
    const method = req.method
    const {id} = req.params
    if(!ObjectId.isValid(id)){
        return res.status(404).send({message: "Id is not a valid"}) 
    }
    await connect()
    switch (method) {
        case 'DELETE':
            try {
                const data = await Users.findOne({_id: id})
                if (!data) {
                    return res.status(400).json({
                        message: 'User not found'
                    })
                }
                
                await Users.deleteOne({_id: id})

                return res.status(200).json({
                    message: "Delete user successfully",
                })

            } catch (error) {
                return res.status(500).json({
                    message: "Error getting user"
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
export default deleteUser