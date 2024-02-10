import mongoose from "mongoose";


const connectDb = async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
          
        });
        console.log(`MongoDb Connected:${conn.connection.host}`);
    }
    
    catch(e){
        console.log(e.message);
        process.exit(1);
    }

}
export default connectDb;
