const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

router.post("/registerUser", (req,res,next) => {
  const authUser = new authModel({
    email:req.body.email,
    username: req.body.username,
    password: authModel.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  let promise = authUser.save();

  promise.then((doc) => {
    return res.status(201).json({message: "User Registered Successfully!", userDetails:doc});
  })

  promise.catch((err) => {
    return res.status(501).json({message:'Error registering user'})
  })
})

router.post("/loginUser", (req,res,next) => {
  let promise = authModel.findOne({email:req.body.email}).exec();

  promise.then((doc) => {
    if(doc){
      if(doc.isValid(req.body.password)){
        let token = jwt.sign({username:doc.username}, 'secret', {expiresIn: "3h"});

        return res.status(200).json({message: "Login Successful", token:token});
      }
      else{
        return res.status(501).json({message:"Invalid Password!!"});
      }
    }
    else{
      return res.status(501).json({message:"User is not registered!!"});
    }
  });

  promise.catch((err) => {
    return res.status(501).json({message:"Something went wrong!!! Please check your credentials"})
  });
})

module.exports = router;
