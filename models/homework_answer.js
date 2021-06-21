const mongoose=require('mongoose');
const validator = require("validator")

homeworkAnswerschema=new mongoose.Schema({

student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:false},

homework:{type:mongoose.Schema.Types.ObjectId,ref:'Homework',required:false},
answer:{type:String,required:true},


});


homeworkAnswerModel = mongoose.model('HomeworkAnswer', homeworkAnswerschema);

module.exports = homeworkAnswerModel;