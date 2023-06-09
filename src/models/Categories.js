import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Product'
        }
    ],
    status: { type: String, default:"enabled" },
}, {
    timestamps: true,
    versionKey: false,
})


export default mongoose.model('Categories', categoriesSchema)