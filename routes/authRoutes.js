const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

router.post('/registerUser', function(req,res,next){
  const authUser = new authModel({
    email:req.body.email,
    username: req.body.username,
    password: authModel.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  let promise = authUser.save();

  promise.then(function(doc){
    return res.status(201).json(doc)
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user'})
  })
})

router.post('/loginUser', function(req,res,next){
  let promise = authModel.findOne({email:req.body.email}).exec();

  promise.then(function(doc){
    if(doc){
      if(doc.isValid(req.body.password)){
        let token = jwt.sign({username:doc.username}, 'secret', {expiresIn: "3h"});

        return res.status(200).json(token);
      }
      else{
        return res.status(501).json({message:"Invalid Password!!"});
      }
    }
    else{
      return res.status(501).json({message:"User is not registered!!"});
    }
  });

  promise.catch(function(err){
    return res.status(501).json({message:"Something went wrong!!! Please check your credentials"})
  });
})

module.exports = router;
