const express = require('express');
const mongoose = require ("mongoose");
const compression = require('compression');
var router = express.Router();
const bodyParse = require('body-parser');
const JsonData = bodyParse.json();
const multer = require('multer');
const app = express();
const path = require("path");
const cors = require('cors');
const header = require("./middleware/header");
const CertificateGenerator = require("./models/expence");
require("./database/databaseConnection");
const PORT = process.env.PORT || 8000;

require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('./dist/dream-house'))
app.use(cors({origin: '*'}))
app.use(header)
app.use(compression())

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage })

// POST Request for Image Upload
let lastId = 0;
const getUniqueId = () => {
  return lastId++;
}

app.post('/imageUpload',JsonData ,upload.single('file') , (req,res,next)=>{
  const file = req.file;
  console.log(file.filename);
  if(!file){
      const error = new error('no file')
      error.httpStatusCode=400
      return next(error)
  }

  var send = new CertificateGenerator({

      moneyPaidBy: req.body.moneyPaidBy,
      toWhomMoneyPaid: req.body.toWhomMoneyPaid,
      totalAmount: req.body.totalAmount,
      paidAmount: req.body.paidAmount,
      pendingAmount: req.body.pendingAmount,
      category: req.body.category,
      billDate: req.body.billDate.slice(0,15),
      id: lastId++,
      imageData: file.filename
  })
  send.save().then((responce)=>{
      console.log(file.filename);
  }).catch((err)=>{
      console.log(err);
  })
  res.send(file)


})

















// app.post('/imageUpload',JsonData, upload.single('file') , (req, res)=>{
//     const file = req.file;

//     var send = new Expences({

//       moneyPaidBy: req.body.moneyPaidBy,
//       toWhomMoneyPaid: req.body.toWhomMoneyPaid,
//       totalAmount: req.body.totalAmount,
//       paidAmount: req.body.paidAmount,
//       pendingAmount: req.body.pendingAmount,
//       category: req.body.category,
//       datePicker: req.body.datePicker,
//       formatedDate: req.body.formatedDate,
//       imageData: file.filename
//      })

//     send.save().then(()=>{
//         console.log(file.filename);
//         res.status(201).send(send);
//     }).catch((e)=>{
//         console.log(e);
//         res.status(400).send(e);
//     })
//     // res.send(file);
//     res.status(201).send(send);
//  })

// Post Request For Create Student

 app.post("/expences", ( req, res ) =>{
    const postRequest = new CertificateGenerator(req.body);
    postRequest.save().then(() => {
        res.status(201).send(postRequest);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

// Get Request For All Student

app.get("/expences", async( req,res ) => {
    try{
        const getAllData = await CertificateGenerator.find();
        // console.log(getExpencesData);
        res.send(getAllData);
    }catch(e){
        res.send(e);
    }
})

// Get Request For Only Single Student

app.get("/expences/:id", async( req,res ) => {
    try{
        const _id = req.params.id;
        const getSingleData = await CertificateGenerator.findById(_id);
        res.send(getSingleData);
    }catch(e){
        res.send(e);
    }
})

// Put Request For Update Specific Student

app.put("/expences/:id", async( req,res ) => {
    try{
        const _id = req.params.id;
        const putRequest = await CertificateGenerator.findByIdAndUpdate(_id,
            req.body, {
            new : true
        });
        res.send(putRequest);
    }catch(e){
        res.send(e);
    }
})

// Patch Request For Update Specific Student

app.patch("/expences/:id", async( req,res ) => {
    try{
        const _id = req.params.id;
        const patchRequest = await CertificateGenerator.findByIdAndUpdate(_id, req.body, {
            new : true
        });
        res.send(patchRequest);
    }catch(e){
        res.send(e);
    }
})

// Delete Request For Delete Specific Student

app.delete("/expences/:id", async( req,res ) => {
    try{
        const _id = req.params.id;
        const deleteRequest = await CertificateGenerator.findByIdAndDelete(_id)
        res.send(deleteRequest);
    }catch(e){
        res.send(e);
    }
})

app.listen(PORT, () => {
    console.log(`Connection is setup at ${PORT}`);
})
