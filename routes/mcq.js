const express=require('express');
const router=express.Router();
const Mcq=require('../model/mcq');

router.get("/",async (req,res)=>{

    const mcq=await Mcq.find({});

    if(!mcq){
        return res.status(400).json({error:"No mcq found"});
    }

    return res.status(200).json({mcq:mcq});
});

router.get("/:id",async (req,res)=>{

    const mcq=await Mcq.findById(req.params.id);

    if(!mcq){
        return res.status(400).json({error:"No mcq found"});
    }

    return res.status(200).json({mcq:mcq});
});

router.post("/",async (req,res)=>{

    const {body, explanation, options}=req.body;

    if(!body || !explanation || !options){
        return res.status(400).json({error:"Please fill all the fields"});
    }

    const mcq=await Mcq.create({
        body,
        explanation,
        options
    });

    return res.status(200).json({message:"Mcq created successfully", mcq:mcq});
});

router.put("/:id",async (req,res)=>{
    const {body, explanation, options}=req.body;

    if(!body || !explanation || !options){
        return res.status(400).json({error:"Please fill all the fields"});
    }

    const mcq=await Mcq.findByIdAndUpdate(req.params.id,{
        body,
        explanation,
        options
    });

    return res.status(200).json({message:"Mcq updated successfully", mcq:mcq});

});

router.delete("/:id",async (req,res)=>{

    const mcq=await Mcq.findByIdAndDelete(req.params.id);

    return res.status(200).json({message:"Mcq deleted successfully", mcq:mcq});
});

module.exports=router;
