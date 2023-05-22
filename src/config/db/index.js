import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const connect = async function(){
    try {
        await mongoose.connect( process.env.URI_DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('successfully');
        
    } catch (error) {
        console.log('Error');
           
    }
    // mongoose.connect("mongodb://127.0.0.1:27017/Web17308", {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    // .then(() => console.log("Connect"))
    // .catch((e) => console.log(e))
}
export default connect