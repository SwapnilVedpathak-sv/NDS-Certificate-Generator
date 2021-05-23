const mongoose = require("mongoose");
const certificateGenerateSchema = new mongoose.Schema({
  customer_name: String,
  customer_email: String,
  customer_address: String,
  ambient_temp: String,
  relative_humidity: String,
  location_of_calibration: String,
  certificate_no: String,
  date_of_calibration: Object,
  next_calibration_due: Object,
  calibration_method_ref_IS: String,
  instrument_name: String,
  instrument_id_no: String,
  instrument_serial_no: String,
  instrument_make_model: String,
  instrument_type: String,
  instrument_range: String,
  instrument_least_count: String,
  acceptance_criteria: String,
  standard_instrument: String,
  standard_instrument_identification_no: String,
  standard_instrument_certificate_no: String,
  standard_instrument_calibration_date: Object,
  standard_instrument_next_calibration_due: Object,
  calibration_results_calibration_points: String,
  calibration_results_UUC_reading: String,
  calibration_results_standard_reading: String,
});

// New Collection

const AllCertificateData = new mongoose.model(
  "AllCertificateData",
  certificateGenerateSchema
);

module.exports = AllCertificateData;
