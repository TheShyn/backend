import express from 'express'
import getAllCate from '../api/categories/all.js'
import getDetailCate from '../api/categories/detail'
import updateCate from '../api/categories/update/index.js'
import deleteProduct from '../api/categories/delete.js/index.js'
import createCate from '../api/categories/create/index.js'
import { checkPermission } from '../middleware/checkPermission.js'


const route = express.Router()


route.get('/',getAllCate)
route.get('/:id',getDetailCate)
route.patch('/:id',checkPermission,updateCate)
route.delete('/:id',checkPermission,deleteProduct)
route.post('/',checkPermission,createCate)

export default route