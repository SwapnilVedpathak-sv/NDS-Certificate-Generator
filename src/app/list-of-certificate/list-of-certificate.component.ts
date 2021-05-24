import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RootService } from '../root.service';

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
}

//   displayedColumns = ['id', 'moneyPaidBy', 'toWhomMoneyPaid', 'category', 'actions'];
//
//   displaySpinner = false;
//   showTable = false;

//   dataSource:any;

//   // ngAfterViewInit() {
//   //   this.dataSource.paginator = this.paginator;
//   // }

//

//   /

//   onRowClicked(row:any) {
//     // console.log('Row clicked: ', row);
// }
//   openDialog(row: any) {
//     console.log('Row clicked', row);
//     // const dialog = this.dialog.open(UpdateExpenceComponent, {
//     //    height: "600px", width: "500px" ,
//     //   // Can be closed only by clicking the close button
//     //   disableClose: true,
//     //   data: row
//     // });
//   }

//   deleteCurrentExpence(item:any){
//     // console.log("runhsdughfdjghu",item)
//     // console.warn("swapnil",this.collection)
//     // this.collection.splice(item-1, 1)

//     // this.root.deleteCurrentExpence(id, item).subscribe((result)=>{
//     //   console.warn(result)
//     // })
//   }
