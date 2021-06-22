import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RootService } from '../root.service';

@Component({
  selector: 'app-generate-certificate-with-in-de',
  templateUrl: './generate-certificate-with-in-de.component.html',
  styleUrls: ['./generate-certificate-with-in-de.component.scss'],
})
export class GenerateCertificateWithInDeComponent implements OnInit {
  ambientTemp = '250C ± 40C';
  relativeHumidity = '< 70% RH';
  calibrationFrom: FormGroup;
  calibration_result: FormArray;
  standard_instrument_details: FormArray;

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
      instrument_unit: [],
      instrument_department: [],
      instrument_location: [],
      calibration_result: this.fb.array([this.createCalibrationResult()]),
      standard_instrument_details: this.fb.array([this.createStandardInstrumentDetails()]),
      checkedFormType: "withIncrement"
    });
  }

  ngOnInit() {}

  // getFullScaleValue() {
  //   this.FullScale = this.fullScale;
  // }

  // calculateValues() {
  //   let ErrorInC;
  //   let ErrorInPercent;
  //   const errorInCelsius = this.standard - this.UUCReading;
  //   ErrorInC = errorInCelsius.toString().slice(0, 4);

  //   const errorInPercentage = (ErrorInC * this.FullScale) % 100;
  //   ErrorInPercent = errorInPercentage.toString().slice(0, 4);

  //   this.percentError = ErrorInPercent;
  //   this.celsiusError = ErrorInC;
  // }

  createCalibrationResult() {
    return this.fb.group({
      calibration_results_calibration_points: [''],
      calibration_results_UUC_reading: [''],
      calibration_results_standard_reading_increasing: [''],
      calibration_results_standard_reading_decreasing: [''],
    });
  }

  createStandardInstrumentDetails() {
    return this.fb.group({
      standard_instrument: [''],
      standard_instrument_identification_no: [''],
      standard_instrument_certificate_no: [''],
      standard_instrument_calibration_date: [''],
      standard_instrument_next_calibration_due: [''],
    });
  }

  addCalibrationResult() {
    const control = <FormArray>this.calibrationFrom.controls['calibration_result'];
    control.push(this.createCalibrationResult());
  }

  addStandardInstrumentDetails() {
    const control = <FormArray>this.calibrationFrom.controls['standard_instrument_details'];
    control.push(this.createStandardInstrumentDetails());
  }


  removeStandardInstrumentDetail(i: number) {
    const control = <FormArray>this.calibrationFrom.controls['standard_instrument_details'];
    control.removeAt(i);
  }

  removeCalibrationResult(i: number) {
    const control = <FormArray>this.calibrationFrom.controls['calibration_result'];
    control.removeAt(i);
  }

  
  save() {
    this.root.saveCalibrationCertificate(this.calibrationFrom.value).pipe(first()).subscribe((res) => {
      console.log('Response', res);
      Swal.fire({
        title: "Success",
        text: "Your certificate has been generated successfully !!",
        icon: "success"
      })
      this.calibrationFrom.reset();
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops!! Someting went wrong...',
        text: `Please try again later !!`
      })
    });
    console.log("this.calibrationFrom.value",this.calibrationFrom.value)
  }
}
