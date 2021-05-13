const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const schema = new Schema({
  email : {type:String, require:true},
  username: {type:String, require:true},
  password: {type:String,require:true},
  creation_dt:{type:Date,require:true}
});

schema.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
  return bcrypt.compareSync(hashedpassword, this.password);
}

const authModel = new mongoose.model('authModel', schema);

module.exports = authModel;
