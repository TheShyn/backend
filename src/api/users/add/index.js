import bcrypt from "bcryptjs";
import connect from "../../../config/db";
import Users from "../../../models/Users";
import { signupSchema } from "../../../validate/SchemaSignup";
const AddUser = async (req, res) => {

    const method = req.method
    const { name, email, password } = req.body
    await connect()
    switch (method) {
        case "POST":
            try {
                let {error} = signupSchema.validate(req.body)
                if(error){
                    return res.status(400).send({message:error.message});

                }
                const userExists = await Users.findOne({ email });
                if (userExists) {
                    return res.status(409).json({
                        message: "User already exists",
                        connect: false
                    })
                }
                
                const hashedPassword = await bcrypt.hash(password, 10);
                
                const user = await Users.create({
                    name,
                    email,
                    password: hashedPassword,
                    role: "user"
                });
                user.password = undefined;
                user.role = undefined;
                return res.status(201).json({
                    message: "User created successfully",
                    user,
                    // accessToken: token,
                });
            } catch (error) {
                return res.send({message:error});
            }
            break;

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export default AddUser
