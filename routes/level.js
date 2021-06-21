var express = require('express');
var router = express.Router();
const levelModel = require("../models/level");
const semmesterModel = require("../models/semmester");
const passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//GET levels
router.get('/level',passport.authenticate('jwt', { session : false}), (req, res) => {
    console.log('list level')
    levelModel.find({},(err,data)=>{
      if(!err) return res.json(data) 
      res.send("erro cannot list level") 
      
      })
  
  })

 
//Add level
router.post('/',passport.authenticate('jwt', { session : false}), (req, res) => {
  const   number=req.body.number;

  console.log(req.body) ///
  const userData = req.body
  const userInstance = new  levelModel ({

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


//Add semester
router.post('/semester', passport.authenticate('jwt', { session : false}),(req, res) => {
  const semmester=req.body.semmester;
  const level=req.body.level;

  console.log(req.body) ///
  const userData = req.body
  const userInstance = new  semmesterModel ({

    semmester,
    level


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
