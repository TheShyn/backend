import express from 'express'
import routerProduct from './api.js'
import routerUser from './user.js'
import routeCate from './categories.js'
import routerMember from './users.js'
import uploadRouter from './cloudinary-upload.js'
import routerCart from './cart.js'
import routeFeedback from "./feedback.js"
const router = express.Router();

router.use("/products", routerProduct)
router.use('/categories',routeCate)
router.use('/auth', routerUser)
router.use('/upload', uploadRouter)
router.use('/users', routerMember)
router.use('/carts', routerCart)
router.use('/feedbacks', routeFeedback)
export default router