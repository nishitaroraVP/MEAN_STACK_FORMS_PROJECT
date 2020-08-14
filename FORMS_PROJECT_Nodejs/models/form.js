const mongoose = require('mongoose');
const FormSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true   
                       
    },
    slug:{
        type:String,
        required:true
    },
    is_deleted:{
        type:Number,
        default:0
    },
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:'Question'}]
})

const Forms = mongoose.model('Form',FormSchema);

module.exports = Forms;