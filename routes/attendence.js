var express = require('express');
var router = express.Router();
const attendenceModel = require("../models/attendence");
const passport = require('passport');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
 

router.post('/', passport.authenticate('jwt', { session : false}),(req, res) => {
  const status=req.body.status;
  const date=req.body.date;
 
  const userInstance = new attendenceModel({

    status,
    date,
   


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
