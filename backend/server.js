import  express  from "express";
import dotenv from "dotenv";
import connectDb from "./Db/Db.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 5000;
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js"

dotenv.config()

connectDb();
const app= express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Routes
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);



app.listen(5000,()=>{console.log(`server running at http://localhost:${PORT}`);
});