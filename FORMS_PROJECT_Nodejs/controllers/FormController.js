const Form = require('../models/form');
const Forms = require('../models/form');
const Questions = require('../models/questions');
const randomString = require('randomstring');
module.exports = {
    //Questions array in the form [{question:{statement:"what is your id?"}}] //
    createForm:async(req,res)=>{
        try {
            const data = req.body;
           
            const questions = await Questions.insertMany(data.questions);
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
    }
    
}