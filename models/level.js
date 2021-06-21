const mongoose=require('mongoose');
const validator = require("validator")

levelschema=new mongoose.Schema({

number:{type:String,required:true},
 

});


levelModel = mongoose.model('Level', levelschema);

module.exports = levelModel;