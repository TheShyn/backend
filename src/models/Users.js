import mongoose from "mongoose";

const Schema = mongoose.Schema

const User  = Schema({
    email: {type: String},
    password: {type: String},
    role: {type: String}
},{ versionKey: false })

export default mongoose.model('User', User)