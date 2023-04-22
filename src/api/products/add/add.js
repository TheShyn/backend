import connect from "../../../config/db"
import Categories from "../../../models/Categories";
import Product from "../../../models/Product";
import SchemaProduct from "../../../validate/SchemaProduct";

const AddProduct = async (req, res) => {
    const method = req.method
    const data = req.body
    console.log(data)
    await connect()
    switch (method) {
        case 'POST':
            try {

                let { error } = SchemaProduct.validate(data)
                if (error) {
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
                const item = await Product.create(data)
                console.log(item.name);
                
                await Categories.findByIdAndUpdate(item.categoryId, {
                    $addToSet: {
                        products: item._id,
                    },
                });
                return res.status(200).send({ message: "Add product successfully", data: data })

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