const mongoose = require('mongoose');
const QuestionSchema = mongoose.Schema({
    question:{
        statement:String,
        inputType:String,
        responses:[{response:String,email:String}]

    }
})

const Questions = mongoose.model('Question',QuestionSchema);

module.exports = Questions;