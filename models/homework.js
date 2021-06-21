const mongoose=require('mongoose');
const validator = require("validator")


homeworkschema=new mongoose.Schema({

name:{type:String,required:true},

course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:false},


});


homeworkModel = mongoose.model('Homework', homeworkschema);

module.exports = homeworkModel;