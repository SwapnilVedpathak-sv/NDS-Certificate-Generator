import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
// declare let jsPDF: new () => any;



// import { Canvas, Columns, ITable, Line, PdfMakeWrapper, Table } from 'pdfmake-wrapper';
// import { Txt } from 'pdfmake-wrapper';

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { promise } from 'selenium-webdriver';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// PdfMakeWrapper.setFonts(pdfFonts);

// const pdf = new PdfMakeWrapper();

// interface dataResponce {
//   customer_name: String,
//   customer_email: String,
//   customer_address: String,
//   ambient_temp: String,
//   relative_humidity: String,
//   location_of_calibration: String,
//   certificate_no: String,
//   date_of_calibration: String,
//   next_calibration_due: String,
//   calibration_method_ref_IS: String,
//   instrument_name: String,
//   instrument_id_no: String,
//   instrument_serial_no: String,
//   instrument_make_model: String,
//   instrument_type: String,
//   instrument_range: String,
//   instrument_least_count: String,
//   acceptance_criteria: String,
//   standard_instrument: String,
//   standard_instrument_identification_no: String,
//   standard_instrument_certificate_no: String,
//   standard_instrument_calibration_date: String,
//   standard_instrument_next_calibration_due: String,
//   calibration_results_calibration_points: String,
//   calibration_results_UUC_reading: String,
//   calibration_results_standard_reading: String
// }

@Component({
  selector: 'app-list-of-certificate',
  templateUrl: './list-of-certificate.component.html',
  styleUrls: ['./list-of-certificate.component.scss'],
})
export class ListOfCertificateComponent {
  constructor(private root: RootService, public dialog: MatDialog) {}
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

  // pdfData: any;
  // generatedPDF: any;


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

  onRowClicked(row: any){
    // console.log('Row clicked: ', row);
    this.certificateData = row;
    // console.log('certificateData', this.certificateData);
  }


  makePDF(){
    let pdf = new jsPDF();
    pdf.text("hello", 10,10);
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        pdf.save('demo.pdf');
      }
    })
  //   pdf.autoTable( {
  //     theme: "plain",
  //     startY: 45,
  //     margin: {
  //       top: 45
  //     }

  // })
  pdf.save();
}

  download() {

    // let doc = new jsPDF();

//     doc.autoTable({html: '#table'});

// // doc.output('datauri','test.pdf');
// doc.output('datauri', { filename: 'example.pdf' })

  }


}


  // ///////////////////////////////////////////////////////////////////// PDF // /////////////////////////////////////////////////////////////////////

  // async generatePdf() {
  //   const data = await this.onRowClicked(this.certificateData)
  //   console.log("Certificate Datagfhfghfghfgjhfgjhfgh", this.certificateData)

  //   pdf.pageMargins([ 40, 60, 40, 60 ]);
  //   this.body();
  //   pdf.add(this.createTable(data));
  //   pdf.add(
  //     pdf.ln(1)
  // );
  //   this.header();




    // var dd = {
    //   content: [

    //     {
    //         columns: [
    //           {
    //             text: 'M/s, Nviro Development Solutions \n F-7/5, MIDC Chikalthana, Near Vertex Advertising, \n Naregaon Main Road, Aurangabad-431006',
    //             fontSize: 10
    //           },
    //           {
    //             text: 'Certificate No \n Date Of Calibration \n Next Calibration Date \n Calibration Method/ Ref',
    //             fontSize: 10
    //           },
    //           {
    //             text: ': 2021/01/002 \n : 18/01/2021 \n : 17/01/2022 \n : NDS-023/NA ',
    //             fontSize: 10,
    //             alignMent: 'right'
    //           }
    //         ]
    //     },
    //     {
    //       text: 'CALIBRATION CERTIFICATE',
    //       fontSize : 20,
    //       style: 'header'
    //     },
    //     {
    //       layout: 'lightHorizontalLines',
    //       table: {
    //         // headers are automatically repeated if the table spans over multiple pages
    //         // you can declare how many rows should be treated as headers
    //         headerRows: 1,
    //         widths: [ '*', 'auto', 100, '*' ],

    //         body: [

    //           [{ text: 'First', bold: true }, { text: 'Second', bold: true }, { text: 'Third', bold: true }, { text: 'The last one', bold: true }],
    //           [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
    //           [ 'Val 2', 'Val 2', 'Val 3', 'Val 4' ]
    //         ]
    //       }
    //     },

    //   ],
    //   styles: {
    //     header: {
    //       fontSize: 22,
    //       bold: true
    //     },
    //     anotherStyle: {
    //       italics: true
    //     },
    //   }

    // };

    // const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   pdf.create().download();
  // }




// createTable(data : dataResponce[]): ITable {
//   [{}]
//   return new Table([
//     ['id','userid', 'title', 'completed'],
//     // ...this.extractData(data)
//   ]).end;
// }

// extractData(data : dataResponce[]): TableRow[] {
//     return data.map(row => row.ambient_temp)
// }

  // body(){
  //   // pdf.add(
  //   //   new Columns([ 'Hello', 'world' ]).end
  //   // )
  //   pdf.pageMargins([ 40, 60, 40, 60 ]);

  //   pdf.add(
  //     new Columns([
  //       'M/s, Nviro Development Solutions \n F-7/5, MIDC Chikalthana, Near Vertex Advertising, \n Naregaon Main Road, Aurangabad-431006', 'Certificate No \n Date Of Calibration \n Next Calibration Date \n Calibration Method/ Ref',
  //       `: ${this.certificateData.certificate_no} \n : ${this.certificateData.date_of_calibration} \n : ${this.certificateData.next_calibration_due} \n : ${this.certificateData.calibration_method_ref_IS}`
  //     ]).alignment('left').fontSize(10).end
  //   );

  //   pdf.add(
  //     new Canvas([
  //         new Line([0,360], [490, 360]).end
  //     ]).end
  // );


//   pdf.add(
//     pdf.ln(1)
// );

//   pdf.add(new Table([
//     ['']
// ]).widths('*').end)


    // pdf.add(
    //   new Columns([
    //     'Certificate No \n Date Of Calibration \n Next Calibration Date \n Calibration Method/ Ref',
    //     ': 2021/01/002 \n : 18/01/2021 \n : 17/01/2022 \n : NDS-023/NA ',
    //   ]).columnGap(10).alignment('left').end
    // );
  // }

  // header() {
  //   pdf.pageMargins(40);
  //   pdf.add(new Txt('CALIBRATION CERTIFICATE').alignment('center').bold().fontSize(20).end);
  //   }
  // generatePDF(action = 'open') {
  //   console.log('invoice', this.certificateData);
  //   const docDefinition = {
  //     info: {
  //       title: "this.pdfData.title",
  //       author: "this.pdfData.author",
  //       subject: "this.pdfData.subject",
  //       keywords: "this.pdfData.keywords",
  //       creator: "this.pdfData.creator",
  //       creationDate: new Date(),
  //     },
  //     pageSize: "A4",
  //     pageOrientation: "landscape",
  //     pageMargins: [40, 60, 40, 60],
  //     content: [
  //       {
  //         text: 'ELECTRONIC SHOP',
  //         fontSize: 16,
  //         alignment: 'center',
  //         color: '#047886',
  //       },
  //       {
  //         text: 'INVOICE',
  //         fontSize: 20,
  //         bold: true,
  //         alignment: 'center',
  //         decoration: 'underline',
  //         color: 'skyblue',
  //       },
  //       {
  //         text: 'Customer Details',
  //         style: 'sectionHeader',
  //       },
  //       {
  //         columns: [
  //           [
  //             {
  //               text: this.certificateData.customerName,
  //               bold: true,
  //             },
  //             { text: this.certificateData.address },
  //             { text: this.certificateData.email },
  //             { text: this.certificateData.contactNo },
  //           ],
  //           [
  //             {
  //               text: `Date: ${new Date().toLocaleString()}`,
  //               alignment: 'right',
  //             },
  //             {
  //               text: `Bill No : ${(Math.random() * 1000).toFixed(0)}`,
  //               alignment: 'right',
  //             },
  //           ],
  //         ],
  //       },
  //       {
  //         text: 'Order Details',
  //         style: 'sectionHeader',
  //       },
  //       {
  //         table: {
  //           headerRows: 1,
  //           widths: ['*', 'auto', 'auto', 'auto'],
  //           body: [
  //             ['Product', 'Price', 'Quantity', 'Amount'],
  //             ...this.certificateData.products,
  //           ],
  //           // .map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
  //           // [{text: 'Total Amount', colSpan: 3}, {}, {}, this.certificateData.products.reduce((sum:any, p:any)=> sum + (p.qty * p.price), 0).toFixed(2)]
  //         },
  //       },
  //       {
  //         text: 'Additional Details',
  //         style: 'sectionHeader',
  //       },
  //       {
  //         text: this.certificateData.calibration_method_ref_IS,
  //         margin: [0, 0, 0, 15],
  //       },
  //       {
  //         columns: [
  //           [{ qr: `${this.certificateData.customerName}`, fit: '50' }],
  //           [{ text: 'Signature', alignment: 'right', italics: true }],
  //         ],
  //       },
  //       {
  //         text: 'Terms and Conditions',
  //         style: 'sectionHeader',
  //       },
  //       {
  //         ul: [
  //           'Order can be return in max 10 days.',
  //           'Warrenty of the product will be subject to the manufacturer terms and conditions.',
  //           'This is system generated invoice.',
  //         ],
  //       },
  //     ],
  //     styles: {
  //       sectionHeader: {
  //         bold: true,
  //         decoration: 'underline',
  //         fontSize: 14,
  //         margin: [0, 15, 0, 15],
  //       },
  //     },
  //   };

  //  this.generatedPDF = pdfMake.createPdf(docDefinition);

  //   // if(action==='download'){

  //   // }else if(action === 'print'){
  //   //   pdfMake.createPdf(docDefinition).print();
  //   // }else{
  //   //   pdfMake.createPdf(docDefinition).open();
  //   // }
  // }
