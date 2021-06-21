const mongoose=require('mongoose');
const validator = require("validator")

examschema=new mongoose.Schema({

examFile:{type:String,required:true},

course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:false},
teacher:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:false},
level: {type:mongoose.Schema.Types.ObjectId, ref:'Level', required:false},

date:{type:Date,required:true,default:Date()},
from:{type:Date,required:true,default:Date()},
to:{type:Date,required:true,default:Date()},



});


examModel = mongoose.model('Exam', examschema);

module.exports = examModel;