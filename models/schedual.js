const mongoose=require('mongoose');
const validator = require("validator")

schedualschema=new mongoose.Schema({

day:{type:String,required:true,default:Date()},

  


});


schedualModel = mongoose.model('Schedual',schedualschema);

module.exports =schedualModel;