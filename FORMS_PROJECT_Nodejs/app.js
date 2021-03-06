const express  = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('./Utils/database');
const router = require('./routes/routes');
const Hubspot = require('hubspot')

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
})
app.use(express.json());

app.use(router);
app.listen(PORT,()=>{
    console.log(`Server connected at ${PORT}`);
})
