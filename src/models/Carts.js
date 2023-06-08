import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Types.ObjectId,
        ref:"Users",
        required:true
    },
    product: {
        type:mongoose.Types.ObjectId,
        ref:"Products",
        required:true
    },
    name: {type:String, required:true},
    price: {type:Number, required:true},
    discount: {type:Number, required:true},
    quantity: {type:Number, required:true},
    img: { type: String, required: true },


},{
    timestamps: true,
    versionKey: false,
}) 
export default mongoose.model('Cart', cartsSchema)