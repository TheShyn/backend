import mongoose from "mongoose";

// với mongodb thì bạn có thể tạo trường linh hoạt cái này cái kia không. không giống như db quan hệ vậy nên Schema để quy định quy chuẩn cho dữ liệu truyền vào
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {type:String, default: "Product"},
    price:{ type: Number, min: 18 },
    categoryId: {
        type:mongoose.Types.ObjectId,
        ref:"Categories"
    },
    description: {type:String},
    discount: {type: Number , default: 0},
    img: {type:String},
    imgs: {type:Array},
    status: {type:String, default: "enabled"},
}, { versionKey: false })


export default mongoose.model('product', Product); 