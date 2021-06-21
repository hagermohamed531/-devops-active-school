const mongoose=require('mongoose');
const validator = require("validator")

parentschema=new mongoose.Schema({

name:{type:String,required:true},
email:{type:String,reuired:true, unique:true, validate:{validator: validator.isEmail}},
password:{type:String,required:true,minlength:8},
type:{type:String,
    enum : ['student','admin','teacher','parent'],
    default: 'parent'
},
phone:{type:String,required:true},
address:{type:String,required:true},
student: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:false},
 


});


parentModel = mongoose.model('Parent', parentschema);

module.exports = parentModel;