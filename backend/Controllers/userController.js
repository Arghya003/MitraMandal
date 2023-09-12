
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import generateTokenAndSetCookie from "../Utils/helpers/generateTokenAndSetCookie.js"





//login user

const loginUser=async(req,res)=>{

    try{
         const { username, password } = req.body;
         const user = await User.findOne( { username } );
         const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
        if(!isPasswordCorrect||!user)return res.status(400).json({message:"Invalid Username or Password"});


        generateTokenAndSetCookie(user._id,res);


        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,

        });
    }
    catch(e){
        res.status(500).json({message:e.message})
        console.log("Error in Login User",e.message)

    }
}

//Logout user

const logoutUser=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:1})
        res.status(200).json({message:"Logged Out Succesfully"})
    }
    catch(e){
         res.status(500).json({ message: e.message });
         console.log("error is logoutuser:", e.message);
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

//Follow & Unfollow  User

const followUser=async(req,res)=>{
    try {
      const { id } = req.params;
      const userToModify = await User.findById(id);
      const currentUser = await User.findById(req.user._id);

      

      if (id === req.user._id.toString())
        return res
          .status(400)
          .json({ error: "You cannot follow/unfollow yourself" });

      if (!userToModify || !currentUser)
        return res.status(400).json({ error: "User not found" });

      const isFollowing = currentUser.following.includes(id);

      if (isFollowing) {
        // Unfollow user
        await User.findByIdAndUpdate(id, {
          $pull: { followers: req.user._id },
        });
        await User.findByIdAndUpdate(req.user._id, {
          $pull: { following: id },
        });
        res.status(200).json({ message: "User unfollowed successfully" });
      } else {
        // Follow user
        await User.findByIdAndUpdate(id, {
          $push: { followers: req.user._id },
        });
        await User.findByIdAndUpdate(req.user._id, {
          $push: { following: id },
        });
        res.status(200).json({ message: "User followed successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log("Error in followUnFollowUser: ", err.message);
    }

}


export {signupUser,loginUser,logoutUser,followUser}