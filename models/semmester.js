const mongoose=require('mongoose');
const validator = require("validator")

semmesterschema=new mongoose.Schema({

semmester:{type:String,required:true},
level: {type:mongoose.Schema.Types.ObjectId, ref:'Level', required:false},
 


});

semmesterModel = mongoose.model('Semmester',semmesterschema);

module.exports =semmesterModel;