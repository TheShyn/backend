import connect from "../../config/db"
import Users from "../../models/Users";
import bcrypt from "bcryptjs";
import { loginSchema } from "../../validate/SchemaLogin";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
const Login = async (req, res) => {
    const {SECRET_CODE} = process.env
    const data = req.body
    const method = req.method
    await connect()

    switch (method) {
        case "POST":
            try {
                const {error} = loginSchema.validate(data)
                if(error){
                    return res.status(400).send({ message: error?.details[0].message })
                }
                const user = await Users.findOne({ email: data.email }).populate("cart");
                if (!user) {
                    return res.status(400).send({ message: "user not found" });
                }
                if(user.status === 'disabled'){
                    return res.status(400).send({ message: "your account got ban" });

                }
                const validPass = await bcrypt.compare(data.password, user.password);
                // const validPass = await bcrypt.compare(user.password, data.password)
                if (!validPass) {
                    return res.status(400).send({ message: "Mật khẩu không đúng" })
                }
                const token = jwt.sign({ _id: user._id }, SECRET_CODE, {
                    expiresIn: "1d",
                });
                user.password = undefined;
                if (user && validPass) {
                    return res.status(200).send({
                        message: "Đăng nhập thành công",
                        accessToken: token,
                        user,
                    });
                }
            } catch (error) {
                return res.send({ message: error });
            }


            break;

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export default Login