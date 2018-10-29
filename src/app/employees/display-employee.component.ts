// This is a child component of listEmployee component
import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges { // OnChanges is to capture previous and next emp data
// @Input() emp: Employee; // Data comes from parent component listEmployee, declared to capture input chnages using ngOnChnges
 @Input() employeeId: number;
 private _employee: Employee; // _indicates private variable
 @Input()
 set emp(value: Employee) {
   console.log('Setter Previous - '+ this._employee?this._employee.name:"Null");
   console.log('Setter Current - ' + value.name);

   this._employee = value;
 }
get emp(): Employee {
  return this._employee;
}
  constructor() { }

  ngOnInit() {
  }
  // Tracks the input chnages using ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    // const previousEmp =  <Employee>changes.emp.previousValue ;
    // const currentEmp = <Employee>changes.emp.currentValue;
    // console.log('Previous : ' + (previousEmp ? previousEmp.name: 'Null');
    // console.log('Current :' + currentEmp.name);

      // console.log(changes);
  }

}
