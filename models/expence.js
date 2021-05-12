const mongoose = require("mongoose");
const certificateGenerateSchema = new mongoose.Schema({
  moneyPaidBy:String,
  toWhomMoneyPaid:String,
  totalAmount:Number,
  paidAmount:Number,
  pendingAmount:Number,
  category:String,
  billDate:String,
  id:Number,
  imageData:String
})

// New Collection

const CertificateGenerator = new mongoose.model('CertificateGenerator', certificateGenerateSchema);

module.exports = CertificateGenerator;
