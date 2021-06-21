const mongoose=require('mongoose');
const validator = require("validator")

materialschema=new mongoose.Schema({

// student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:false},

course:{type:mongoose.Schema.Types.ObjectId,ref:'Course',required:false},
teacher:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:false}


});


materialModel = mongoose.model('Material', materialschema);

module.exports = materialModel;