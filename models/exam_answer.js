const mongoose=require('mongoose');
const validator = require("validator")

examAnswerschema=new mongoose.Schema({

student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:false},

exam:{type:mongoose.Schema.Types.ObjectId,ref:'Exam',required:false},
answer:{type:String,required:true},


});


examAnswerModel = mongoose.model('ExamAnswer', examAnswerschema);

module.exports = examAnswerModel;