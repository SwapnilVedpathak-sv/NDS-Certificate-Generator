import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { data } from '../configuration/image-dataURI.config'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-of-certificate',
  templateUrl: './list-of-certificate.component.html',
  styleUrls: ['./list-of-certificate.component.scss'],
})
export class ListOfCertificateComponent {
  constructor(private root: RootService, public dialog: MatDialog, private router:Router) { }
  imageDataURI = data;
  displayedColumns = [
    'id',
    'moneyPaidBy',
    'toWhomMoneyPaid',
    'category',
    'actions',
  ];
  collection: any = [];

  dataSource = new MatTableDataSource(this.collection);
  displaySpinner = false;

  UUCReading;
  StandardReading;
  CalibrationPoints;

  StandardIncresingReading;
  StandardDecresingReading;

  ErrorInC;
  ErrorInPercent;

  ErrorInCIncrement;
  ErrorInPercentIncrement;
  ErrorInCDecrement;
  ErrorInPercentDecrement;

  standard_instrument;
  standard_instrument_calibration_date;
  standard_instrument_certificate_no;
  standard_instrument_identification_no;
  standard_instrument_next_calibration_due;

  certificateData: any = [];

  @ViewChild('table', { static: false }) el!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.displaySpinner = true;
    await this.root.getList().subscribe((result) => {
      this.displaySpinner = false;
      this.collection = result;
      console.log('dataSource', this.collection);

      this.dataSource = new MatTableDataSource(this.collection);
      this.dataSource.paginator = this.paginator;
      console.log('this.dataSource', this.paginator);
      console.log('this.dataSourcekjhjklhkljhk', this.dataSource);
    });
  }

  generateCertificatePDF(id:any){
    this.root.getCurrentCertificate(id).subscribe((result)=>{
      console.warn("result",result)

      const rowData = result
      this.certificateData = rowData;
      this.generatePDF("open", rowData)
      this.generatePDFForIncrementDecrement("open", rowData)
    })
  }

  deleteCertificate(item:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete from application !!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.root.deleteCertificate(item).subscribe((result)=>{
          console.warn("result",result)
        })
        location.reload();
      }
    })    
  }

  generatePDF(action, rowData) {
    if (rowData.checkedFormType === "withoutIncrement") {

      let i;
      var rows = [];
      var row = [];
      const acceptance_criteria = rowData.acceptance_criteria;

      row.push([{ text: `Calibration Point (${rowData.instrument_unit})`, fontSize: 10 }, { text: `UUC Reading (${rowData.instrument_unit})`, fontSize: 10 }, { text: `Standard Reading (${rowData.instrument_unit})`, fontSize: 10 }, { text: `Error In (${rowData.instrument_unit})`, fontSize: 10 }, { text: `Error In (%)`, fontSize: 10 }]);


      for (i in this.certificateData.calibration_result) {

        this.UUCReading = this.certificateData.calibration_result[i].calibration_results_UUC_reading
        this.StandardReading = this.certificateData.calibration_result[i].calibration_results_standard_reading
        this.CalibrationPoints = this.certificateData.calibration_result[i].calibration_results_calibration_points

        // Calculate Error in Celsius
        const errorInCelsius = this.StandardReading - this.UUCReading;
        this.ErrorInC = errorInCelsius.toString().slice(0, 4);

        // Calculate Error in Percentage
        const errorInPercentage = (this.ErrorInC * acceptance_criteria) % 100;
        this.ErrorInPercent = errorInPercentage.toString().slice(0, 4);

        row.push([{ text: `${this.CalibrationPoints}`, fontSize: 10 }, { text: `${this.UUCReading}`, fontSize: 10 }, { text: `${this.StandardReading}`, fontSize: 10 }, { text: `${this.ErrorInC}`, fontSize: 10 }, { text: `${this.ErrorInPercent}`, fontSize: 10 }]);

      }

      rows.push([{ text: `Instruments`, fontSize: 10 }, { text: `Identification No./Sr.no.`, fontSize: 10 }, { text: `Certificate No`, fontSize: 10 }, { text: `Cal. Date`, fontSize: 10 }, { text: `Valid up to`, fontSize: 10 }]);

      for (i in this.certificateData.standard_instrument_details) {

        this.standard_instrument = this.certificateData.standard_instrument_details[i].standard_instrument
        this.standard_instrument_calibration_date = this.certificateData.standard_instrument_details[i].standard_instrument_calibration_date
        this.standard_instrument_certificate_no = this.certificateData.standard_instrument_details[i].standard_instrument_certificate_no
        this.standard_instrument_identification_no = this.certificateData.standard_instrument_details[i].standard_instrument_identification_no
        this.standard_instrument_next_calibration_due = this.certificateData.standard_instrument_details[i].standard_instrument_next_calibration_due

        rows.push([{ text: `${this.standard_instrument}`, fontSize: 10 }, { text: `${this.standard_instrument_identification_no}`, fontSize: 10 }, { text: `${this.standard_instrument_certificate_no}`, fontSize: 10 }, { text: `${this.standard_instrument_calibration_date?.slice(0, 10)}`, fontSize: 10 }, { text: `${this.standard_instrument_next_calibration_due?.slice(0, 10)}`, fontSize: 10 }]);
      }

      let docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 85],
        content: [
          //   {
          //     svg: `<svg version="1.1" id="line_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="500px" height="5px" xml:space="preserve">
          //   <path class="path2" fill="#000" stroke-width="3" stroke="#000" d="M0 0 l1120 0"/>
          // </svg>`,
          //     margin: [5, 5, 5, 0]
          //   },
          // {
          //   text: "\n"
          // },
          {
            layout: 'headerLineOnly',
            table: {
              widths: ['*'],
              body: [
                [{ text: `CALIBRATION CERTIFICATE`, fontSize: 20, bold: true, alignment: 'center' }]
              ]
            }
          },
          {
            text: "\n"
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['*', '*', 50, '*', '*',],
              body: [
                [{ text: `Customer Name`, fontSize: 10, bold: true }, { text: `: ${rowData.customer_name}`, fontSize: 10 }, { text: `` }, { text: `Customer Address`, fontSize: 10, bold: true }, { text: `: ${rowData.customer_address}`, fontSize: 10 }]
              ]
            }
          },
          {
            text: "\n"
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['*', '*', 50, '*', '*',],

              body: [
                [{ text: `Ambient Temp`, fontSize: 10 }, { text: `: ${rowData.ambient_temp}`, fontSize: 10 }, { text: `` }, { text: `Certificate No`, fontSize: 10 }, { text: `: ${rowData.certificate_no}`, fontSize: 10 }],
                [{ text: `Relative Humidity`, fontSize: 10 }, { text: `: ${rowData.relative_humidity}`, fontSize: 10 }, { text: `` }, { text: `Date of Calibration`, fontSize: 10 }, { text: `: ${rowData.date_of_calibration?.slice(0, 10)}`, fontSize: 10 }],
                [{ text: `Location of Calibration`, fontSize: 10 }, { text: `: ${rowData.location_of_calibration}`, fontSize: 10 }, { text: `` }, { text: `Next Calibration Due`, fontSize: 10 }, { text: `: ${rowData.next_calibration_due?.slice(0, 10)}`, fontSize: 10 }],
                [{ text: `Condition of Instruments`, fontSize: 10 }, { text: `: OK`, fontSize: 10 }, { text: `` }, { text: `Calibration Method/ Ref IS`, fontSize: 10 }, { text: `: ${rowData.calibration_method_ref_IS}`, fontSize: 10 }],
              ]
            }
          },
          {
            text: "\n"
          },
          {
            text: "\n"
          },
          {
            text: 'Instrument Details',
            fontSize: 15,
            bold: true
          },
          {
            text: "\n"
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['*', '*', 50, '*', '*',],

              body: [
                [{ text: `Instrument Name`, fontSize: 10 }, { text: `: ${rowData.instrument_name}`, fontSize: 10 }, { text: `` }, { text: `Least Count`, fontSize: 10 }, { text: `: ${rowData.instrument_least_count}`, fontSize: 10 }],
                [{ text: `Instrument I.D`, fontSize: 10 }, { text: `: ${rowData.instrument_id_no}`, fontSize: 10 }, { text: `` }, { text: `Acceptance Criteria`, fontSize: 10 }, { text: `: ${rowData.acceptance_criteria}`, fontSize: 10 }],
                [{ text: `Make/Model`, fontSize: 10 }, { text: `: ${rowData.instrument_make_model}`, fontSize: 10 }, { text: `` }, { text: `Department`, fontSize: 10 }, { text: `: ${rowData.instrument_department}`, fontSize: 10 }],
                [{ text: `Type`, fontSize: 10 }, { text: `: ${rowData.instrument_type}`, fontSize: 10 }, { text: `` }, { text: `Location`, fontSize: 10 }, { text: `: ${rowData.instrument_location}`, fontSize: 10 }],
                [{ text: `Range`, fontSize: 10 }, { text: `: ${rowData.instrument_range}`, fontSize: 10 }, { text: `` }, { text: `` }, { text: `` }]
              ]
            }
          },
          {
            text: "\n"
          },
          {
            text: "\n"
          },
          {
            text: 'Standard Instrument Details',
            fontSize: 15,
            bold: true
          },
          {
            text: "\n"
          },
          {
            table: {
              widths: ['*', '*', '*', '*', '*'],

              body: rows
            }
          },
          {
            text: "\n"
          },
          {
            text: "\n"
          },
          {
            text: 'Calibration Results',
            fontSize: 15,
            bold: true
          },
          {
            text: "\n"
          },
          {
            table: {
              widths: ['*', '*', '*', '*', '*'],
              body: row
            }
          },
          {
            text: "\n"
          },
          {
            text: `Remark : CALIBRATION FOUND OK`,
            fontSize: 10,
            bold: true
          },
          {
            text: "\n"
          },
          {
            text: 'Note :',
            fontSize: 12,
            bold: true
          },
          {
            text: "\n"
          },
          {
            ol: [
              'UUC Stands for Unit Under Calibration',
              'Sandards used for calibration are traceable to National/International standards.',
              'This certificate refers t othe only for particular itesm/submitted for calibration purpose.',
              'The Observations /Results reported in this particular certificate are valid at the time of and under state condition of mearuement.',
              'Readings given above are as on received condition of an insturment.',
              'This certicate shall not be reroduced except in full without our prior permission in writing.'
            ],
            fontSize: 10,
          },
          {
            text: "\n"
          },
          {
            table: {
              heights: [10, 70],
              widths: ['*', '*'],
              body: [
                [{ text: `Calibrated By`, fontSize: 10, bold: true, alignment: 'center' }, { text: `Authorized By`, alignment: 'center', fontSize: 10, bold: true }],
                [{ text: `` }, { text: `` }]
              ]
            },
            margin: [0, 0, 0, 5]
          },
          {
            table: {
              widths: ['*'],
              body: [
                [{ text: `**** End of Calibration Certificate ****`, fontSize: 10, alignment: 'center' }]
              ]
            }
          }
        ]
      };

      if (action === 'download') {
        pdfMake.createPdf(docDefinition).download();
      } else if (action === 'print') {
        pdfMake.createPdf(docDefinition).print();
      } else {
        pdfMake.createPdf(docDefinition).open();
      }

    }
  }


  generatePDFForIncrementDecrement(action, rowData) {
    console.log("rowdata checked", rowData.checkedFormType)
    if (rowData.checkedFormType === "withIncrement") {

      let i;
      var rows = [];
      var row = [];
      const acceptance_criteria = rowData.acceptance_criteria;

      row.push([{ text: `Calibration Point (${rowData.instrument_unit})`, fontSize: 10, rowSpan: 2 }, { text: `UUC Reading (${rowData.instrument_unit})`, fontSize: 10, rowSpan: 2 }, { text: `Standard Reading (${rowData.instrument_unit})`, fontSize: 10, colSpan: 2 }, '', { text: `Error In (${rowData.instrument_unit})`, fontSize: 10, colSpan: 2}, '', { text: `Error In (%)`, fontSize: 10, colSpan: 2 }, ''],
                ['', '', 'Increment', 'Decrement','Increment', 'Decrement','Increment', 'Decrement',]
      );

      for (i in this.certificateData.calibration_result) {

        this.UUCReading = this.certificateData.calibration_result[i].calibration_results_UUC_reading
        // this.StandardReading = this.certificateData.calibration_result[i].calibration_results_standard_reading
        this.CalibrationPoints = this.certificateData.calibration_result[i].calibration_results_calibration_points

        // Get Increment and Decrement Value from Array
        this.StandardIncresingReading = this.certificateData.calibration_result[i].calibration_results_standard_reading_increasing
        this.StandardDecresingReading = this.certificateData.calibration_result[i].calibration_results_standard_reading_decreasing

        // Calculate Increment Error in Celsius
        const errorInCelsiusIncrement = this.StandardIncresingReading - this.UUCReading;
        this.ErrorInCIncrement = errorInCelsiusIncrement.toString().slice(0, 4);

        // Calculate Increment Error in Percentage
        const errorInPercentageIncrement = (this.ErrorInCIncrement * acceptance_criteria) % 100;
        this.ErrorInPercentIncrement = errorInPercentageIncrement.toString().slice(0, 4);

        // Calculate Decrement Error in Celsius
        const errorInCelsiusDecrement = this.StandardDecresingReading - this.UUCReading;
        this.ErrorInCDecrement = errorInCelsiusDecrement.toString().slice(0, 4);

        // Calculate Decrement Error in Percentage
        const errorInPercentageDecrement = (this.ErrorInCDecrement * acceptance_criteria) % 100;
        this.ErrorInPercentDecrement = errorInPercentageDecrement.toString().slice(0, 4);

        row.push([{ text: `${this.CalibrationPoints}`, fontSize: 10 }, { text: `${this.UUCReading}`, fontSize: 10 }, { text: `${this.StandardIncresingReading}`, fontSize: 10 }, { text: `${this.StandardDecresingReading}`, fontSize: 10 }, { text: `${this.ErrorInCIncrement}`, fontSize: 10 },  { text: `${this.ErrorInCDecrement}`, fontSize: 10 }, { text: `${this.ErrorInPercentIncrement}`, fontSize: 10 }, { text: `${this.ErrorInPercentDecrement}`, fontSize: 10 }]);

      }

      rows.push([{ text: `Instruments`, fontSize: 10 }, { text: `Identification No./Sr.no.`, fontSize: 10 }, { text: `Certificate No`, fontSize: 10 }, { text: `Cal. Date`, fontSize: 10 }, { text: `Valid up to`, fontSize: 10 }]);

      for (i in this.certificateData.standard_instrument_details) {

        this.standard_instrument = this.certificateData.standard_instrument_details[i].standard_instrument
        this.standard_instrument_calibration_date = this.certificateData.standard_instrument_details[i].standard_instrument_calibration_date
        this.standard_instrument_certificate_no = this.certificateData.standard_instrument_details[i].standard_instrument_certificate_no
        this.standard_instrument_identification_no = this.certificateData.standard_instrument_details[i].standard_instrument_identification_no
        this.standard_instrument_next_calibration_due = this.certificateData.standard_instrument_details[i].standard_instrument_next_calibration_due

        rows.push([{ text: `${this.standard_instrument}`, fontSize: 10 }, { text: `${this.standard_instrument_identification_no}`, fontSize: 10 }, { text: `${this.standard_instrument_certificate_no}`, fontSize: 10 }, { text: `${this.standard_instrument_calibration_date?.slice(0, 10)}`, fontSize: 10 }, { text: `${this.standard_instrument_next_calibration_due?.slice(0, 10)}`, fontSize: 10 }]);
      }

      let dd = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 85],
        content: [
          //   {
          //     svg: `<svg version="1.1" id="line_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="500px" height="5px" xml:space="preserve">
          //   <path class="path2" fill="#000" stroke-width="3" stroke="#000" d="M0 0 l1120 0"/>
          // </svg>`,
          //     margin: [5, 5, 5, 0]
          //   },
          // {
          //   text: "\n"
          // },
          {
            layout: 'headerLineOnly',
            table: {
              widths: ['*'],
              body: [
                [{ text: `CALIBRATION CERTIFICATE`, fontSize: 20, bold: true, alignment: 'center' }]
              ]
            }
          },
          {
            text: "\n"
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['*', '*', 50, '*', '*',],
              body: [
                [{ text: `Customer Name`, fontSize: 10, bold: true }, { text: `: ${rowData.customer_name}`, fontSize: 10 }, { text: `` }, { text: `Customer Address`, fontSize: 10, bold: true }, { text: `: ${rowData.customer_address}`, fontSize: 10 }]
              ]
            }
          },
          {
            text: "\n"
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['*', '*', 50, '*', '*',],

              body: [
                [{ text: `Ambient Temp`, fontSize: 10 }, { text: `: ${rowData.ambient_temp}`, fontSize: 10 }, { text: `` }, { text: `Certificate No`, fontSize: 10 }, { text: `: ${rowData.certificate_no}`, fontSize: 10 }],
                [{ text: `Relative Humidity`, fontSize: 10 }, { text: `: ${rowData.relative_humidity}`, fontSize: 10 }, { text: `` }, { text: `Date of Calibration`, fontSize: 10 }, { text: `: ${rowData.date_of_calibration?.slice(0, 10)}`, fontSize: 10 }],
                [{ text: `Location of Calibration`, fontSize: 10 }, { text: `: ${rowData.location_of_calibration}`, fontSize: 10 }, { text: `` }, { text: `Next Calibration Due`, fontSize: 10 }, { text: `: ${rowData.next_calibration_due?.slice(0, 10)}`, fontSize: 10 }],
                [{ text: `Condition of Instruments`, fontSize: 10 }, { text: `: OK`, fontSize: 10 }, { text: `` }, { text: `Calibration Method/ Ref IS`, fontSize: 10 }, { text: `: ${rowData.calibration_method_ref_IS}`, fontSize: 10 }],
              ]
            }
          },
          {
            text: "\n"
          },
          {
            text: "\n"
          },
          {
            text: 'Instrument Details',
            fontSize: 15,
            bold: true
          },
          {
            text: "\n"
          },
          {
            layout: 'noBorders',
            table: {
              widths: ['*', '*', 50, '*', '*',],

              body: [
                [{ text: `Instrument Name`, fontSize: 10 }, { text: `: ${rowData.instrument_name}`, fontSize: 10 }, { text: `` }, { text: `Least Count`, fontSize: 10 }, { text: `: ${rowData.instrument_least_count}`, fontSize: 10 }],
                [{ text: `Instrument I.D`, fontSize: 10 }, { text: `: ${rowData.instrument_id_no}`, fontSize: 10 }, { text: `` }, { text: `Acceptance Criteria`, fontSize: 10 }, { text: `: ${rowData.acceptance_criteria}`, fontSize: 10 }],
                [{ text: `Make/Model`, fontSize: 10 }, { text: `: ${rowData.instrument_make_model}`, fontSize: 10 }, { text: `` }, { text: `Department`, fontSize: 10 }, { text: `: ${rowData.instrument_department}`, fontSize: 10 }],
                [{ text: `Type`, fontSize: 10 }, { text: `: ${rowData.instrument_type}`, fontSize: 10 }, { text: `` }, { text: `Location`, fontSize: 10 }, { text: `: ${rowData.instrument_location}`, fontSize: 10 }],
                [{ text: `Range`, fontSize: 10 }, { text: `: ${rowData.instrument_range}`, fontSize: 10 }, { text: `` }, { text: `` }, { text: `` }]
              ]
            }
          },
          {
            text: "\n"
          },
          {
            text: "\n"
          },
          {
            text: 'Standard Instrument Details',
            fontSize: 15,
            bold: true
          },
          {
            text: "\n"
          },
          {
            table: {
              widths: ['*', '*', '*', '*', '*'],
              body: rows
            }
          },
          {
            text: "\n"
          },
          {
            text: "\n"
          },
          {
            text: 'Calibration Results',
            fontSize: 15,
            bold: true
          },
          {
            text: "\n"
          },
          {
            
            table: {
              headerRows: 2,
              widths: ['*', '*', '*', '*', '*','*','*','*',],
              body: row
            }
          },
          {
            text: "\n"
          },
          {
            text: `Remark : CALIBRATION FOUND OK`,
            fontSize: 10,
            bold: true
          },
          {
            text: "\n"
          },
          {
            text: 'Note :',
            fontSize: 12,
            bold: true
          },
          {
            text: "\n"
          },
          {
            ol: [
              'UUC Stands for Unit Under Calibration',
              'Sandards used for calibration are traceable to National/International standards.',
              'This certificate refers t othe only for particular itesm/submitted for calibration purpose.',
              'The Observations /Results reported in this particular certificate are valid at the time of and under state condition of mearuement.',
              'Readings given above are as on received condition of an insturment.',
              'This certicate shall not be reroduced except in full without our prior permission in writing.'
            ],
            fontSize: 10,
          },
          {
            text: "\n"
          },
          {
            table: {
              heights: [10, 70],
              widths: ['*', '*'],
              body: [
                [{ text: `Calibrated By`, fontSize: 10, bold: true, alignment: 'center' }, { text: `Authorized By`, alignment: 'center', fontSize: 10, bold: true }],
                [{ text: `` }, { text: `` }]
              ]
            },
            margin: [0, 0, 0, 5]
          },
          {
            table: {
              widths: ['*'],
              body: [
                [{ text: `**** End of Calibration Certificate ****`, fontSize: 10, alignment: 'center' }]
              ]
            }
          }
        ]
      };

      if (action === 'download') {
        pdfMake.createPdf(dd).download();
      } else if (action === 'print') {
        pdfMake.createPdf(dd).print();
      } else {
        pdfMake.createPdf(dd).open();
      }
    }
  }
}