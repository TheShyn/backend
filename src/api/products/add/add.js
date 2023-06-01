import connect from "../../../config/db"
import Categories from "../../../models/Categories";
import Product from "../../../models/Product";
import SchemaProduct from "../../../validate/SchemaProduct";
import { v2 as cloudinary } from 'cloudinary';
const AddProduct = async (req, res) => {
    const method = req.method
    const data = req.body
    const files = req.files
    const imgs = files.map(item=>item.path)
    const fileData = {...req.body,imgs: imgs}
    // console.log(files)
    
    // console.log(data)
    await connect()
    switch (method) {
        case 'POST':
            try {

                let { error } = SchemaProduct.validate(fileData)
                if (error) {
                    if(files){
                        const names = files.map((item)=>item.filename)
                        cloudinary.api.delete_resources(names)
                    }
                    return res.status(400).send({ message: error.message });

                }
                const { name, categoryId } = data
                
                const product = await Product.findOne({ name })
                if (product) {
                    return res.status(400).send({ message: 'Product is exists' })
                }
                const isCate = await Categories.findOne({_id: categoryId})
                if(!isCate){
                    return res.status(400).send({ message: 'Cate not found' })
                }
                const dataUpload = {
                    ...fileData,
                    img: imgs[0],
                    imgs: imgs
                }                
                const item = await Product.create(dataUpload)
                console.log(item.name);
                
                await Categories.findByIdAndUpdate(item.categoryId, {
                    $addToSet: {
                        products: item._id,
                    },
                });
                return res.status(200).send({ message: "Add product successfully", data: dataUpload })

            } catch (error) {

                return res.send({ message: error });
            }
            break;
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export default AddProduct