import express from 'express';
import GetAll from '../api/feedback/all';
import AddCmt from '../api/feedback/add';
import getCmtOfProduct from '../api/feedback/get';
import DeleteCmt from '../api/feedback/delete';

const route = express.Router();

route.get("/",GetAll)
route.post("/",AddCmt)
route.get("/:id",getCmtOfProduct)
route.delete("/:id",DeleteCmt)

export default route;