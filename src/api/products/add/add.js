import connect from "../../../config/db"
import Categories from "../../../models/Categories";
import Product from "../../../models/Product";
import SchemaProduct from "../../../validate/SchemaProduct";
import { v2 as cloudinary } from 'cloudinary';
const  AddProduct = async (req, res) => {
    await connect()
    const method = req.method
    const data = req.body        
    switch (method) {
        case 'POST':
            try {

                let { error } = SchemaProduct.validate(data)
                
                if (error) {
                    if(data?.imgs && data.imgs.length){
                        const arrayImg = data.imgs.map(item=>{
                            const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                            return "products/"+fileName
                        })
                        cloudinary.api.delete_resources(arrayImg)   
                    }
                    return res.status(400).send({ message: error.message });

                }
                const { name, categoryId } = data
                
                const product = await Product.findOne({ name })
                if (product) {
                    if(data?.imgs && data.imgs.length){
                        const arrayImg = data.imgs.map(item=>{
                            const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                            return "products/"+fileName
                        })
                        cloudinary.api.delete_resources(arrayImg)   
                    }
                    return res.status(400).send({ message: 'Product is exists' })
                }
                const isCate = await Categories.findOne({_id: categoryId})
                if(!isCate){
                    if(data?.imgs && data.imgs.length){
                        const arrayImg = data.imgs.map(item=>{
                            const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                            return "products/"+fileName
                        })
                        cloudinary.api.delete_resources(arrayImg)   
                    }
                    return res.status(400).send({ message: 'Cate not found' })
                }       
                const newData ={
                    ...data,
                    img:data.imgs[0]
                }
                const item = await Product.create(newData)
                console.log(item.name);
                
                await Categories.findByIdAndUpdate(item.categoryId, {
                    $addToSet: {
                        products: item._id,
                    },
                });
                return res.status(200).send({ message: "Add product successfully", data: data })

            } catch (error) {
                console.log('freking error');
                if(data?.imgs && data.imgs.length){
                    const arrayImg = data.imgs.map(item=>{
                        console.log(item);
                        const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                        return "products/"+fileName
                    })
                    cloudinary.api.delete_resources(arrayImg)   
                }
                
                return res.send({ message: error });
            }
            break;
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export default AddProduct