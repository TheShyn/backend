import express from 'express'
import routerProduct from './api.js'
import routerUser from './user.js'
import routeCate from './categories.js'
import routerMember from './users.js'
import uploadRouter from './cloudinary-upload.js'
const router = express.Router();

router.use("/products", routerProduct)
router.use('/categories',routeCate)
router.use('/auth', routerUser)
router.use('/upload', uploadRouter)
router.use('/users', routerMember)
export default router