const mongoose=require('mongoose');
const validator = require("validator")

courseLevelschema=new mongoose.Schema({


zoom: {type:String,required:false},
level: {type:mongoose.Schema.Types.ObjectId, ref:'Level', required:true},
course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:false},
teacher: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:false},


});


courseLevelModel = mongoose.model('CourseLevel', courseLevelschema);

module.exports = courseLevelModel;