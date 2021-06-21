const mongoose=require('mongoose');
const validator = require("validator")

attendenceschema=new mongoose.Schema({

status:{type:Boolean,required:true},
date:{type:Date,required:true,default:Date()},
student: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:false},
 


});


attendenceModel = mongoose.model('Attendence',attendenceschema);

module.exports =attendenceModel;