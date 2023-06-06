import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Types.ObjectId,
        ref:"Users"
    },
    productId: {
        type:mongoose.Types.ObjectId,
        ref:"Products"
    }
}) 