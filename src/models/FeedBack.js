import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user: { type:mongoose.Types.ObjectId, required: true, ref: 'User' },
    content: {type: String, required :true},
    rate: { type: Number, required: true },
    product: { type:mongoose.Types.ObjectId, required: true, ref: 'Product'}
}, {
    timestamps: true,
    versionKey: false,
})


export default mongoose.model('Feedback', feedbackSchema)