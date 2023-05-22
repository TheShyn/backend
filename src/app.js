import dotenv from "dotenv";
import express from "express";
import Route from "./routes/index.js";
import cors from "cors"

dotenv.config();
//connect to db
// await connect()

const app = express();
app.use(cors());
app.use(express.json());

// app.use(routerProduct);
app.use("/api",Route)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
export const viteNodeApp = app;

