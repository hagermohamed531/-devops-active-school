const mongoose=require('mongoose');
const validator = require("validator")

classschema=new mongoose.Schema({

number:{type:String,required:true},



});


classModel = mongoose.model('Class', classschema);

module.exports = classModel;