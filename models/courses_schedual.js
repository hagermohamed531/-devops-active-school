const mongoose=require('mongoose');
const validator = require("validator")

courses_schedualschema=new mongoose.Schema({

courses:{type:String,required:true},
day: {type:mongoose.Schema.Types.ObjectId, ref:'Schedual', required:false},
 


});


courses_schedualModel = mongoose.model('CoursesSchedual',courses_schedualschema);

module.exports =courses_schedualModel;