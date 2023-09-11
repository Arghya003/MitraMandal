
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import generateTokenAndSetCookie from "../Utils/helpers/generateTokenAndSetCookie.js"


const loginUser=async(req,res)=>{

    try{

    }
    catch(e){
        res.status(500).json({message:e.message})
        console.log("Error in Login User",e.message)

    }
}





//Sign UP USER
const signupUser = async (req, res) =>{
    try{
        const {name,email,username,password}=req.body;
        const user= await User.findOne({$or:[{email},{username}]});

        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);

        const newUser= new User({
            name,
            email,
            username,
            password:hashedPassword,

        })
        await newUser.save()
        generateTokenAndSetCookie(newUser._id,res);

        if(newUser){
            res.status(201).json({
              _id: newUser._id,
              name:newUser.name,
              email:newUser.email,
              username:newUser.username,
              password:newUser.password,
            });
            


        }
        else{
            res.status(400).json({message:"invalid user data "})
        }
    }
    catch(e){
        res.status(500).json({message:e.message})
        console.log("error is signupuser:",e.message)
    }
}


export {signupUser,loginUser}