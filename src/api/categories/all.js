import connect from "../../config/db"
import Categories from "../../models/Categories"

const getAllCate = async function(req,res){
    const method = req.method

    await connect()
    switch (method) {
        case 'GET':
            try {
                const data = await Categories.find({})
                if(!data){
                    return res.status(400).json({
                        message:'cant get categories'
                    })
                }
                return res.status(200).json({
                    message:"Get categories successfully",
                    data: data
                })
                
            } catch (error) {
                return res.status(500).json({
                    message:"Error getting categories"
                })
            }
            break;
    
        default:
            return res.status(500).json({
                message:"Not found"
            })
            break;
    }
}
export default getAllCate