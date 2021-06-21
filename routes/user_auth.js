var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});


//Login
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = { email}
  //Check the user exists
  User.findOne(query, (err, user) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }

    //No User match the search condition
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Account not found'
      });
    }

    //Check if the password is correct
    user.isPasswordMatch(password, user.password, (err, isMatch) => {

        //Invalid password
        if (!isMatch) {
          return res.send({
            success: false,
            message: 'Error, Invalid Password'
          });
        }

        //User is Valid

        const ONE_WEEK = 604800; //Token validtity in seconds

        //Generating the token
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: ONE_WEEK });

        //User Is Valid
        //This object is just used to remove the password from the retuned fields
        let returnUser = {
          name: user.name,
          email: user.email,
          id: user._id
        }

        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          user: returnUser,
          token
        });
    });

  });

});

//Registeration
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address
  });

  newUser.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to save the user'
      });
    }
    res.send({
      success: true,
      message: 'User Saved',
      user
    });
  });
});

// router.post('/signup', function(req, res) {
//   if (!req.body.username || !req.body.password) {
//     res.json({success: false, msg: 'Please pass username and password.'});
//   } else {
//     var newUser = new User({
//       email: req.body.email,
//       password: req.body.password,
//       name: req.body.name,
//       address: req.body.address
//     });
//     // save the user
//     newUser.save(function(err) {
//       if (err) {
//         return res.json({success: false, msg: 'Username already exists.'});
//       }
//       res.json({success: true, msg: 'Successful created new user.'});
//     });
//   }
// });


// ///login
// router.post('/signin', function(req, res) {
//   User.findOne({
//     email: req.body.email,
//     password: req.body.password
//   }, function(err, user) {
//     if (err) throw err;

//     if (!user) {
//       res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
//     } else {
//       // check if password matches
//       user.comparePassword(req.body.password, function (err, isMatch) {
//         if (isMatch && !err) {
//           // if user is found and password is right create a token
//           var token = jwt.sign(user.toJSON(), process.env.SECRET);
//           // return the information including token as JSON
//           res.json({success: true, token: 'JWT ' + token});
//         } else {
//           res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
//         }
//       });
//     }
//   });
// });


// //token


// getToken = function (headers) {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ');
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

module.exports = router;