const Form = require('../models/form');
const Forms = require('../models/form');
const Questions = require('../models/questions');
const randomString = require('randomstring');
const { response } = require('express');
module.exports = {
    //Questions array in the form [{question:{statement:"what is your id?"}}] //
    createForm:async(req,res)=>{
        try {
            const data = req.body;
            console.log(data);
            const questions = await Questions.insertMany(data);
            const question_ids = questions.map((question)=>question.id);
             const form = new Forms({
                slug:randomString.generate(),
                questions:question_ids  
            })
            form.save((err,form)=>{
                if(err){
                    throw new Error(err);
                }
                res.status(201).json(form);
            })
            
        } catch (error) {
            console.log(error.message);
        }
    },
    FormBySlug:async(req,res)=>{
        try {
            const data = req.params;
            const conditions = {};
            if(!data.slug){
                throw ({statusCode:404,message:"MISSING_PARAMS"})

            }
            conditions.slug  = data.slug;
            const form = await Form.findOne(conditions).populate('questions');
            if(!form){
                throw ({statusCode:404,message:"Form_NOT_FOUND"})
            }
            res.status(200).json(form);
        } catch (error) {
            res.status(error.statusCode).json({status:error.statusCode,error:error.message});
        }
    },
    getForms:async(req,res)=>{
        try {
           const form =  await Form.find();
           if(form.length===0){
               throw {error:"NOT_FOUND",statusCode:404}
           }
           res.status(200).json(form);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    },
    saveFormResponse:async(req,res)=>{
        try {
            const data = req.body;
            let result;
            if(!data.responses || !data.slug ){
                throw {statusCode:404,message:"Missing_params"};
            }
            const form = await Form.findOne({slug:data.slug});
            const questionIds = form.questions;
            
            data.responses.forEach(async (response,index)=>{
              await Questions.updateOne({_id:questionIds[index]},{$push:{responses:response}})
            })
                
            res.status(200).json({status:200,message:"Response saved"});
           
                
           
        } catch (error) {
            console.log(error.message);
            res.status(400).json(error);
        }
    }
    
}