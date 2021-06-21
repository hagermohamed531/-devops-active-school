var express = require('express');
var router = express.Router();
const classModel = require("../models/class");
const passport = require('passport');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//GET class
router.get('/class',passport.authenticate('jwt', { session : false}), (req, res) => {
    console.log('list class')
    classModel.find({},(err,data)=>{
      if(!err) return res.json(data) 
      res.send("erro cannot list class") 
      
      })
  
  })

 

router.post('/',passport.authenticate('jwt', { session : false}), (req, res) => {
  const   number=req.body.number;

  console.log(req.body) ///
  const userData = req.body
  const userInstance = new  classModel ({

    number


  })
  console.log(userInstance);
  


  userInstance.save((err,userDoc)=>{
      if(!err) return res.json(userDoc)
      console.log(err);
      res.send("error occured while saving")
  })

  // res.send(req.body);

  // res.send('user created')

})

module.exports = router;
