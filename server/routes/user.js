const express=require('express');
const router=express.Router();
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')

const UserModal=require('../models/user');

const secret="test";
// const signup=require('../controllers/user.js')

router.post("/register",async(req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    try{
        const oldUser=await UserModal.findOne({email});
        
        if(oldUser){
            return res.status(400).json({message:"User Already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,12);
        const result=await UserModal.create({
            email,
            password:hashedPassword,
            name:`${firstName} ${lastName}`
        });
        const token =jwt.sign({email:result.email,id:result._id},secret, {
            expiresIn:'1h',
        });
        res.status(201).json({result,token})
    }catch(error){
    res.status(500).json({message:"Something went wrong"})
    }
});

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    
    try{
        const oldUser=await UserModal.findOne({email})
        if(!oldUser) return res.status(404).json({message:"User doesn't Exist"})

        const isPasswordCorrect=await bcrypt.compare(password,oldUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})

        const token=jwt.sign({email:oldUser.email,id:oldUser._id},secret,
            {expiresIn:"1h"})

            res.status(200).json({result:oldUser,token})
    }catch(error){
        res.status(500).json({message:"Something went wrong"})
        }
})
router.post("/googleSignIn",async (req,res)=>{
    const {email,name,googleId}=req.body;
console.log(email,name,googleId);
    try{
        const oldUser=await UserModal.findOne({email})
        console.log(oldUser);

        if(oldUser){
            const result={_id:oldUser._id.toString(),email,name}
            console.log(result);
            const token =jwt.sign({email:result.email,id:result._id},secret, {
                expiresIn:'1h',
            });
            return res.status(200).json({result,token})
        }

        const result=await UserModal.create({
            email,
            name,
            googleId
        })
        console.log(result);

        const token =jwt.sign({email:result.email,id:result._id},secret, {
            expiresIn:'1h',
        });
        console.log(token
            );

        res.status(201).json({result,token})
    }catch(error){
        res.status(500).json({message:"Something went wrong"})
        console.log("error====>",error);
    }
})

module.exports=router;