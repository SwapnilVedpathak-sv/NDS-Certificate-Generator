import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { data } from '../configuration/image-dataURI.config'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-list-of-certificate',
  templateUrl: './list-of-certificate.component.html',
  styleUrls: ['./list-of-certificate.component.scss'],
})
export class ListOfCertificateComponent {
  constructor(private root: RootService, public dialog: MatDialog) {}
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
  certificateData: any = [];



@ViewChild('table', {static: false}) el! : ElementRef;
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

  onRowClicked(rowData: any){
    this.certificateData = rowData;
    this.generatePDF("open" , rowData)
  }


  generatePDF(action, rowData) {
    const dateOfCalibration = rowData.date_of_calibration.slice(0,10);
    const nextCalibrationDue = rowData.next_calibration_due.slice(0,10);
    console.log(dateOfCalibration)
    let docDefinition = {
      content: [
        //Header Column
        {
          columns: [
            {
              image: this.imageDataURI.ndsLogo,
              width: 91,
              height: 57
            },
            {
              text: 'M/s, Nviro Development Solutions \n F-7/5, MIDC Chikalthana, Near Vertex Advertising, \n Naregaon Main Road, Aurangabad-431006',
              fontSize: 10
            },
            {
              text: 'Certificate No \n Date Of Calibration \n Next Calibration Date \n Calibration Method/ Ref',
              fontSize: 10
            },
            {
              text: `: ${rowData.certificate_no} \n :${dateOfCalibration} \n :${nextCalibrationDue} \n : ${rowData.calibration_method_ref_IS}`,
              fontSize: 10,
              alignMent: 'right'
            }
          ],
          columnGap: 25,
          margin: [0, 0, 20, 0]
        },
        //Horizontal Line using SVG
        {
          svg: `<svg version="1.1" id="line_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="500px" height="5px" xml:space="preserve">
          <path class="path2" fill="#000" stroke-width="3" stroke="#000" d="M0 0 l1120 0"/>
        </svg>`,
          margin: [ 5, 5, 5, 0]
        },
        {
          text: "\n"
        },
        {
          text: 'CALIBRATION CERTIFICATE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [ 5, 0, 5, 0]
        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              text: `Ambient Temp \n Relative Humidity`,
              fontSize: 12
            },
            {
              text: `: ${rowData.ambient_temp} \n : ${rowData.relative_humidity}`,
              fontSize: 12,
              alignMent: 'right'
            },
            {
              text: `Location of Calibration \n Condition of Instruments`,
              fontSize: 12
            },
            {
              text: `: ${rowData.location_of_calibration} \n : Ok`,
              fontSize: 12
            },
          ]
        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              text: `Customer Name`,
              fontSize: 15,
              bold:true
            },
            {
              text: `: ${rowData.customer_name}`,
              fontSize: 12,
              alignMent: 'right'
            }, {
              text: `Customer Address`,
              fontSize: 15,
              bold:true
            },
            {
              text: `: ${rowData.customer_address}`,
              fontSize: 12
            },
          ]
        },
        {
          text: "\n"
        },
        {
          text:'Instrument Details',
          fontSize: 15,
          bold:true
        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              text: `Instrument Name \n Id no. \n Serial no. \n Make/Model`,
              fontSize: 12
            },
            {
              text: `: ${rowData.instrument_name} \n : ${rowData.instrument_id_no} \n : ${rowData.instrument_serial_no} \n : ${rowData.instrument_make_model}`,
              fontSize: 12,
              alignMent: 'right'
            },
            {
              text: `Type \n Range \n Least Count \n Acceptance Criteria`,
              fontSize: 12
            },
            {
              text: `: ${rowData.instrument_type} \n : ${rowData.instrument_range} \n : ${rowData.instrument_serial_no} \n : ${rowData.instrument_least_count}`,
              fontSize: 12
            },
          ]
        },
        {
          text: "\n"
        },
        {
          text:'Standard Instrument Details',
          fontSize: 15,
          bold:true
        },
        {
          text: "\n"
        },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ '*', '*', '*', '*', '*' ],

            body: [
              [ 'Instruments', 'Identification No.', 'Certificate No', 'Calibration Date', 'Next Due Date' ],
              [ `${rowData.standard_instrument}`, `${rowData.standard_instrument_identification_no}`, `${rowData.standard_instrument_certificate_no}`, `${rowData.standard_instrument_calibration_date.slice(0,10)}`, `${rowData.standard_instrument_next_calibration_due.slice(0,10)}` ],
              [ 'Bold value', 'Val 2', 'Val 3', 'Val 4', 'jkghd' ]
            ]
          }
        },
        {
          text: "\n"
        },
        {
          text:'Calibration Results',
          fontSize: 15,
          bold:true
        },
        {
          text: "\n"
        },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [ '*', '*', '*', '*', '*'],

            body: [
              [ 'Calibration Point', 'UUC Reading', 'Standard Reading', 'Error In', 'Error In' ],
              [ '°C', '°C', '°C', '°C', '%' ],
              [ `${rowData.calibration_results_calibration_points}`, `${rowData.calibration_results_UUC_reading}`, `${rowData.calibration_results_standard_reading}`, `XYZ`, `xyz` ]
            ]
          }
        },
        {
          text: "\n"
        },
        {
            text: `Remark : CALIBRATION FOUND OK`,
            fontSize: 15,
            bold:true
        },
        {
          text: "\n"
        },
        {
          text:'Note :',
          fontSize: 15,
          bold:true
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
          ]
        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              text: `Calibrated By`,
              fontSize: 15,
              alignMent: 'center',
              bold:true
            },
            {
              text: `Authorized By`,
              fontSize: 15,
              alignMent: 'center',
              bold:true
            }
          ]
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [15, 0, 15, 0]
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();
    }else{
      pdfMake.createPdf(docDefinition).open();
    }

  }
}
