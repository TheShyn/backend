import express from 'express';
import AddUser from '../api/users/add';
import Login from '../api/users/login';

const RouteUser = express.Router();

RouteUser.post('/register',AddUser) //;+localhost:8000/apilogin
RouteUser.post('/login',Login)
export default RouteUser;