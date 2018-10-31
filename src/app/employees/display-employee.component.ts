// This is a child component of listEmployee component
import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges { // OnChanges is to capture previous and next emp data
 @Input() emp: Employee; // Data comes from parent component listEmployee, declared to capture input chnages using ngOnChnges
 //@Input() employeeId: number;
 private _employeeId : number;
 // tslint:disable-next-line:whitespace
 @Input()

   public get employeeId() : number {
     return this._employeeId;
   }
   public set employeeId(value:number){
     console.log("Value Changed from :"+this._employeeId +" to: "+value);
     this._employeeId = value;
   }
 private _employee: Employee; // _indicates private variable
//  @Input() //Used as an alternative to ngOnChanges
//  set emp(value: Employee) {
//    console.log('Setter Previous - '+ (this._employee?this._employee.name: "Null");
//    console.log('Setter Current - ' + value.name);

//    this._employee = value;
//  }
// get emp(): Employee {
//   return this._employee;
// }
  constructor() { }

  ngOnInit() {
  }
  // Tracks the input chnages using ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    for(const propName of Object.keys(changes))
    {
    console.log(propName);
    const change = changes[propName];
    const from = JSON.stringify(change.previousValue);
    const to = JSON.stringify(change.currentValue);
    console.log(propName +" has changed from "+from +" to "+to);

    }
    // const previousEmp =  <Employee>changes.emp.previousValue ;
    // const currentEmp = <Employee>changes.emp.currentValue;
    // console.log('Previous : ' + (previousEmp ? previousEmp.name: 'Null');
    // console.log('Current :' + currentEmp.name);

      // console.log(changes);
  }

}
