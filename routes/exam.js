var express = require('express');
var router = express.Router();
const examModel = require("../models/exam");
const passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//GET all teacher exams
router.get('/:id', passport.authenticate('jwt', { session : false}), (req, res) => {
    console.log('list all exams')
    examModel.find({teacher:req.params.id},(err,data)=>{
      if(!err) return res.json(data) 
      res.send("erro cannot list class") 
      
      }).populate("teacher").populate("course").populate("level")
  
  })



//teacher add new exam data

router.post('/',  passport.authenticate('jwt', { session : false}),(req, res) => {
   
  const   course=req.body.course;
  const   level=req.body.level;
  const   examFile=req.body.examFile;
  const   teacher=req.body.teacher;
  const   date=req.body.date;
  const   from=req.body.from;
  const   to=req.body.to;
  


  console.log(req.body) ///
  const userData = req.body
  const userInstance = new  examModel ({

    course,
    level,
    examFile,
    teacher,
    date,
    from,
    to


  })
  console.log(userInstance);
  


  userInstance.save((err,userDoc)=>{
      if(!err) return res.json(userDoc)
      console.log(err);
      res.send("error occured while saving")
  })

 

})

//get exam of specific level

router.get('/studentExam/:id', passport.authenticate('jwt', { session : false}), (req, res) => {
    console.log('list all exams')
    examModel.find({level:req.params.id,date:Date()},(err,data)=>{
      if(!err) return res.json(data) 
      res.send("erro cannot list class") 
      
      }).populate("teacher").populate("course").populate("level")
  
  })


module.exports = router;
