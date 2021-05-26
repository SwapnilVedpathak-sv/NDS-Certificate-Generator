import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';
import { jsPDF } from 'jspdf';
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

  onRowClicked(row: any){ 
    this.certificateData = row;
  }


  generatePDF(action = 'open') {
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
              text: ': 2021/01/002 \n : 18/01/2021 \n : 17/01/2022 \n : NDS-023/NA ',
              fontSize: 10,
              alignMent: 'right'
            }
          ],
          columnGap: 25,
          margin: [0, 0, 20, 0]
        },
        //Horizontal Line using SVG
        {
          svg: `<svg version="1.1" id="line_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1200px" height="5px" xml:space="preserve">
          <path class="path2" fill="#000" stroke-width="3" stroke="#000" d="M0 0 l1120 0"/>
        </svg>`,
          margin: [ 5, 0, 5, 0]
        },
        {
          text: 'CALIBRATION CERTIFICATE',
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [ 5, 0, 5, 0]
        },
        {
          text: 'Ambient Temp  :'
        }
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