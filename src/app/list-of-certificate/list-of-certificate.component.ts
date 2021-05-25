import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { Canvas, Columns, Line, PdfMakeWrapper } from 'pdfmake-wrapper';
import { Txt } from 'pdfmake-wrapper';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

PdfMakeWrapper.setFonts(pdfFonts);

const pdf = new PdfMakeWrapper();

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
  pdfData: any;
  generatedPDF: any;

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
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
    this.certificateData = row;
    console.log('certificateData', this.certificateData);
  }

  // ///////////////////////////////////////////////////////////////////// PDF // /////////////////////////////////////////////////////////////////////

  async generatePdf() {
    pdf.pageMargins([ 40, 60, 40, 60 ]);
    this.body();
    pdf.add(
      pdf.ln(1)
  );
    this.header();




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
    pdf.create().download();
  }




  body(){
    // pdf.add(
    //   new Columns([ 'Hello', 'world' ]).end
    // )
    pdf.pageMargins([ 40, 60, 40, 60 ]);

    pdf.add(
      new Columns([
        'M/s, Nviro Development Solutions \n F-7/5, MIDC Chikalthana, Near Vertex Advertising, \n Naregaon Main Road, Aurangabad-431006', 'Certificate No \n Date Of Calibration \n Next Calibration Date \n Calibration Method/ Ref',
        ': 2021/01/002 \n : 18/01/2021 \n : 17/01/2022 \n : NDS-023/NA '
      ]).alignment('left').fontSize(10).end
    );

    pdf.add(
      new Canvas([
          new Line([0,360], [490, 360]).end
      ]).end
  );
    // pdf.add(
    //   new Columns([
    //     'Certificate No \n Date Of Calibration \n Next Calibration Date \n Calibration Method/ Ref',
    //     ': 2021/01/002 \n : 18/01/2021 \n : 17/01/2022 \n : NDS-023/NA ',
    //   ]).columnGap(10).alignment('left').end
    // );
  }

  header() {
    pdf.pageMargins(40);
    pdf.add(new Txt('CALIBRATION CERTIFICATE').alignment('center').bold().fontSize(20).end);
    }
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
}
