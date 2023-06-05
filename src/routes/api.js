import express from 'express';
import AddProduct from '../api/products/add/add.js';
import GetAll from '../api/products/all.js';
import DeleteProduct from '../api/products/delete/delete.js';
import getDetail from '../api/products/product.js';
import UpdateProduct from '../api/products/update/update.js';
import { checkPermission } from '../middleware/checkPermission.js';
import uploadCloud from '../middleware/upload.js';

const routerApi = express.Router();

routerApi.get("/", GetAll)
routerApi.get("/:id",getDetail)
routerApi.patch("/:id", UpdateProduct)
routerApi.delete("/:id",DeleteProduct)
routerApi.post("/", AddProduct)


export default routerApi;