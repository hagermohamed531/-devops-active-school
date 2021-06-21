const mongoose=require('mongoose');
const validator = require("validator")

materialFilesschema=new mongoose.Schema({

materialFile:{type:String,required:true},
material:{type:mongoose.Schema.Types.ObjectId,ref:'Material',required:false},


});


materialFilesModel = mongoose.model('MaterialFiles', materialFilesschema);

module.exports = materialFilesModel;