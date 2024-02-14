import  express  from "express";
import dotenv from "dotenv";
import connectDb from "./Db/Db.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary"
import cors from "cors"
dotenv.config()

connectDb();
const app= express();
app.use(cors({ "origin": "http://127.0.0.1:3000" }));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//console.log(cloudinary.config())
//middlewares
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Routes
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);



app.listen(5000,()=>{console.log(`server running at http://localhost:${PORT}`);
});