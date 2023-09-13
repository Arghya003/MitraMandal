import Post from "../models/postModel.js"
import User from "../models/userModel.js"

const createPost= async(req,res)=>{
    try{
        const {postedBy,text,img}=req.body;

        if(!postedBy||!text){
            return res.status(400).json({message:"Posted and Text feilds are required"});
        }
        const user= await User.findById(postedBy);
        
        if(!user) {return res.statys(404).json({message:"User Not Found"});}

        if(user._id.toString()!=req.user._id.toString()){
            return res.status(401).json({message:"Unauthorised to create Post"})
        }
        const maxLength=500;

        if(text>maxLength){
            return res.status(400).json({message:`Text must be less than ${maxLength} charecters`});
            await newPost.save();

        }
        const newPost= new Post({postedBy,text,img});


    }
    catch(e){
        res.status(500).json({message:"e.message"});
        console.log("Error in create PoST ");
    }

}

export default createPost;
