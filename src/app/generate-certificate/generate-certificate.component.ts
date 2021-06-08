import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RootService } from '../root.service'

@Component({
  selector: 'app-generate-certificate',
  templateUrl: './generate-certificate.component.html',
  styleUrls: ['./generate-certificate.component.scss'],
})
export class GenerateCertificateComponent implements OnInit {
  ambientTemp = "250C ± 40C";
  relativeHumidity = "< 70% RH";
  standard: any = null;
  UUCReading: any = null;
  fullScale: any = null;
  ErrorInC:any = null;
  calibrationFrom: FormGroup;

  constructor(public fb: FormBuilder, private root: RootService) {
    this.calibrationFrom = this.fb.group({
      customer_name: [],
      customer_email: [],
      customer_address: [],
      ambient_temp: [],
      relative_humidity: [],
      location_of_calibration: [],
      certificate_no: [],
      date_of_calibration: [],
      next_calibration_due: [],
      calibration_method_ref_IS: [],
      instrument_name: [],
      instrument_id_no: [],
      instrument_serial_no: [],
      instrument_make_model: [],
      instrument_type: [],
      instrument_range: [],
      instrument_least_count: [],
      acceptance_criteria: [],
      standard_instrument: [],
      standard_instrument_identification_no: [],
      standard_instrument_certificate_no: [],
      standard_instrument_calibration_date: [],
      standard_instrument_next_calibration_due: [],
      calibration_results_calibration_points: [],
      calibration_results_UUC_reading: [],
      calibration_results_standard_reading: [],
      error_in_celsius: [],
      error_in_percentage: []
    });
  }

  ngOnInit() {}

  save() {
    this.root.saveCalibrationCertificate(this.calibrationFrom.value).subscribe(res => {
      console.log("Response", res)
    })
    console.log('From Values', this.calibrationFrom.value);
  }
}
