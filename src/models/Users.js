import mongoose from "mongoose";

const Schema = mongoose.Schema

const User  = Schema({
    email: {type: String},
    name:{type: String},
    password: {type: String},
    role: {type: String, default: 'user'},
    status:{type: String, default: 'enabled'},
    cart: {
        type:mongoose.Types.ObjectId,
        ref:"Carts"
    },
},{ versionKey: false })

export default mongoose.model('User', User)