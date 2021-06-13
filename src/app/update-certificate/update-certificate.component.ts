import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RootService } from '../root.service';

@Component({
  selector: 'app-update-certificate',
  templateUrl: './update-certificate.component.html',
  styleUrls: ['./update-certificate.component.scss']
})
export class UpdateCertificateComponent implements OnInit {
  certificateData: any = []
  calibrationFrom: FormGroup;
  calibration_result: FormArray;
  standard_instrument_details: FormArray;

  constructor(private router: ActivatedRoute, public fb: FormBuilder, private root: RootService) { }

  ngOnInit(): void {
    console.warn("ID", this.router.snapshot.params._id)
    this.root.getCurrentCertificate(this.router.snapshot.params._id).subscribe((result: any) => {

      this.certificateData = result
      console.log("All Certificate", this.certificateData)

      this.calibrationFrom = this.fb.group({
        customer_name: [this.certificateData.customer_name],
        customer_email: [this.certificateData.customer_email],
        customer_address: [this.certificateData.customer_address],
        ambient_temp: [this.certificateData.ambient_temp],
        relative_humidity: [this.certificateData.relative_humidity],
        location_of_calibration: [this.certificateData.location_of_calibration],
        certificate_no: [this.certificateData.certificate_no],
        date_of_calibration: [this.certificateData.date_of_calibration],
        next_calibration_due: [this.certificateData.next_calibration_due],
        calibration_method_ref_IS: [this.certificateData.calibration_method_ref_IS],
        instrument_name: [this.certificateData.instrument_name],
        instrument_id_no: [this.certificateData.instrument_id_no],
        instrument_serial_no: [this.certificateData.instrument_serial_no],
        instrument_make_model: [this.certificateData.instrument_make_model],
        instrument_type: [this.certificateData.instrument_type],
        instrument_range: [this.certificateData.instrument_range],
        instrument_least_count: [this.certificateData.instrument_least_count],
        acceptance_criteria: [this.certificateData.acceptance_criteria],
        instrument_unit: [this.certificateData.instrument_unit],
        calibration_result: this.fb.array([]),
        standard_instrument_details: this.fb.array([]),
      });
      var i;
      for (i in this.certificateData.calibration_result) {
        const control = <FormArray>this.calibrationFrom.controls['calibration_result'];
        control.push(this.getCalibrationResultDetails(this.certificateData.calibration_result[i]));
      }
      for (i in this.certificateData.standard_instrument_details) {
        const control = <FormArray>this.calibrationFrom.controls['standard_instrument_details'];
        control.push(this.getStandardInstrumentDetails(this.certificateData.standard_instrument_details[i]));
      }
    })
  }

  createCalibrationResult() {
    return this.fb.group({
      calibration_results_calibration_points: [''],
      calibration_results_UUC_reading: [''],
      calibration_results_standard_reading: [''],
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

  private getCalibrationResultDetails(el) {

    return this.fb.group({
      calibration_results_calibration_points: [el.calibration_results_calibration_points],
      calibration_results_UUC_reading: [el.calibration_results_UUC_reading],
      calibration_results_standard_reading: [el.calibration_results_standard_reading],
    });
  }

  private getStandardInstrumentDetails(el) {

    return this.fb.group({
      standard_instrument: [el.standard_instrument],
      standard_instrument_identification_no: [el.standard_instrument_identification_no],
      standard_instrument_certificate_no: [el.standard_instrument_certificate_no],
      standard_instrument_calibration_date: [el.standard_instrument_calibration_date],
      standard_instrument_next_calibration_due: [el.standard_instrument_next_calibration_due],
    });
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
    this.root.updateCalibrationCertificate(this.router.snapshot.params._id, this.calibrationFrom.value).subscribe((res) => {
      console.log('Response', res);
    });
    console.log("this.calibrationFrom.value", this.calibrationFrom.value);
    this.calibrationFrom.reset();
  }
}