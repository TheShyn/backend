import express from 'express'
import addToCart from '../api/cart/add'
import removeCart from '../api/cart/delete'
import editCart from '../api/cart/edit'
import getCartUser from '../api/cart/getCartUser'

const route = express.Router()
route.post("/", addToCart)
route.delete("/:id", removeCart)
route.patch("/:id", editCart)
route.get("/", getCartUser)


export default route