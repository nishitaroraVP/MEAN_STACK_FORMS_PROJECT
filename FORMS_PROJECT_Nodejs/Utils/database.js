const mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FormsManagement',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("Database connected")
})

module.exports = mongoose;