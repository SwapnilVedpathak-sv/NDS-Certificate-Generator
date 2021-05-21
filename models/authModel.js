// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

// const schema = new mongoose.Schema({
//   email : {type:String, required:true, unique: true},
//   username: {type:String, required:true, unique: true},
//   password: {type:String, required:true},
//   creation_dt:{type:Date, required:true}
// });

// // schema.statics.hashPassword = function hashPassword(password){
// //   return bcrypt.hashSync(password,10);
// // }

// // schema.methods.isValid = function(hashedpassword){
// //   return bcrypt.compareSync(hashedpassword, this.password);
// // }

// const authModel = new mongoose.model('authModel', schema);

// module.exports = authModel;

exports.generateToken = (payload) => {
  return jwt.sign(payload, "secret key", {
      expiresIn: "90d",
  });
};

var mongoose = require("mongoose");

var userAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    creation_dt: {
        type: String
    },
    token: {
        type: String
    },
    username: {
      type:String,
      required:true,
      unique: true
    }
});

module.exports = mongoose.model("authModel", userAuthSchema);
