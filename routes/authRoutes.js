const express = require('express');
const router = express.Router();
const authModel = require('../models/authModel');

router.post('/', function(req,res,next){
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

module.exports = router;
