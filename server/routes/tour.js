const express=require('express');
const router=express.Router();

const tourModal =require("../models/tour") 


router.post("/",async(req,res)=>{
    const tour=req.body;
    const newTour=new tourModal({
        ...tour,
        createdAt:new Date().toISOString()
    });

    try{
        await newTour.save();
        res.status(201).json(newTour)
    }catch(error){
        res.status(404).json({message:"something went wrong"})
    }
})

router.get("/getTour",async (req,res)=>{
    try{
        const tours=await tourModal.find();
        res.status(200).json(tours)
    }catch(error){
        res.status(404).json({message:"something went wrong"})
    }
})


module.exports=router;