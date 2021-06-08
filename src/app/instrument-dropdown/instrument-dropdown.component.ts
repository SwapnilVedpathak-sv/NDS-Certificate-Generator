import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrument-dropdown',
  templateUrl: './instrument-dropdown.component.html',
  styleUrls: ['./instrument-dropdown.component.scss']
})
export class InstrumentDropdownComponent implements OnInit {
  instrumentType:any
  constructor() { }

  ngOnInit(): void {
  }

  getValue(value){
    this.instrumentType = value
    console.log("instrumentType",this.instrumentType)
  }

}
