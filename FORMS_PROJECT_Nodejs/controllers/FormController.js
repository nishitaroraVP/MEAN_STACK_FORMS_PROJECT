const Forms = require('../models/form');
const Questions = require('../models/questions');
const randomString = require('randomstring');
const Hubspot = require('hubspot');
const hubspot = new Hubspot({
    apiKey: '8be44baf-f21c-4098-a113-a84471352b48',
    checkLimit: false // (Optional) Specify whether to check the API limit on each call. Default: true
  })
 
  
module.exports = {
    //Questions array in the form [{question:{statement:"what is your id?"}}] //
    createForm:async(req,res)=>{
        try {
            const data = req.body;
            let questionsData = data.dynamicInputs;
            let formName = data.name;
            const questions = await Questions.insertMany(questionsData);
            const question_ids = questions.map((question)=>question.id);
             const form = new Forms({
                name:formName,
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
            const form = await Forms.findOne(conditions).populate('questions');
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
           const form =  await Forms.find();
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
            let email;
            console.log(data);
            if(!data.responses || !data.slug ){
                throw {statusCode:404,message:"Missing_params"};
            }
            if(data.responses[0].email!==undefined){
                email = data.responses[0].email;
            }
            const form = await Forms.findOne({slug:data.slug});
            const questionIds = form.questions;
            
            data.responses.forEach(async (response,index)=>{
               
              await Questions.updateOne({_id:questionIds[index]},{$push:{responses:response}})
            })
            const contactObj = {
                "properties": [
                  { "property": "email","value": `${email}`}
                ]
              };
            const contact = await hubspot.contacts.create(contactObj); 
            res.status(200).json({status:200,message:"Response saved",data:contact});
           
                
           
        } catch (error) {
            console.log(error.message);
            res.status(400).json(error);
        }
    },
    getFormResponses:async(req,res)=>{
        try {
            const data = req.params;
            if(!data.slug){
                throw new Error("MISSING_PARAMS");
            }
            const form = await Forms.findOne({slug:data.slug}).populate('questions');
            if(!form){
                throw new Error("FORM_NOT_FOUND");
            }
            res.status(200).json({status:200,data:form});

        } catch (error) {
            res.status(400).json({error:error});
        }
    }
    
}
