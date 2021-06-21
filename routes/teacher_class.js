var express=require('express');
var router=express.Router();
var teacherClass=require("../models/teacher_class");

// var user=require("../models/user");
var classes=require("../models/class");
const passport = require('passport');
// var teacherClass=require("../models/teacher_class");


//get all teachers and thier classes
router.get('/',passport.authenticate('jwt', { session : false}), async (req, res)=> {
  const teachers= await teacherClass.find().populate("tclass").populate("teacher");
  res.send(teachers);
});

//post teacher id and his class number
router.post('/',async (req, res)=> {
  const tclass=req.body.tclass;  
  const teacher=req.body.teacher;  

  const userInstance = new teacherClass({

    tclass,
    teacher
  });

  userInstance.save((err,userDoc)=>{
    if(!err) return res.json(userDoc)
    console.log(err);
    res.send("error occured while saving")
})
});

//get teacher with id 
router.get("/:id", passport.authenticate('jwt', { session : false}), async (req, res) => {
	const teacher = await teacherClass.find({ teacher: req.params.id }).populate("tclass").populate("teacher")
	res.send(teacher)
})


//delete specific class for one teacher
router.delete("/", passport.authenticate('jwt', { session : false}), async (req, res) => {
  const tclass=req.body.tclass;  
  const teacher=req.body.teacher;  
	try {
		await teacherClass.deleteOne({ teacher: teacher,tclass:tclass })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "teacher doesn't exist!" })
	}
})


  
  module.exports = router;
  