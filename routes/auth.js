const express=require('express');
const router=express.Router();
const {generateToken}=require('../service/auth');
const User=require('../model/Auth/auth');

router.post("/register",async (req, res)=>{
    
    const {first_name, last_name, email, password}=req.body;

    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({error:"Please fill all the fields"});
    }

    const userExists=await User.findOne({email});

    if(userExists){
        return res.status(400).json({error:"User already exists"});
    }

    const user=await User.create({
        first_name,
        last_name,
        email,
        password
    });

    return res.status(200).json({message:"User created successfully", user:user});
});

router.post("/login",async (req,res)=>{
        
    const {email, password}=req.body;

    if(!email || !password){
        return res.status(400).json({error:"Please fill all the fields"});
    }

    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({error:"User not found"});
    }

    const isMatch=await user.checkPassword(password, user.password);

    if(!isMatch){
        return res.status(400).json({error:"Invalid credentials"});
    }

    const token=generateToken(user._id);

    return res.status(200).json({message:"User logged in successfully", token:token});
});

module.exports=router;