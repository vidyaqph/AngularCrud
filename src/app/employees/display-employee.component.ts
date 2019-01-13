// This is a child component of listEmployee component
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  // OnChanges is to capture previous and next emp data
  @Input() emp: Employee; // Data comes from parent component listEmployee, declared to capture input chnages using ngOnChnges
  // @Input() employeeId: number; // Pass data from parent to child
  @Input() searchTerm: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>(); // Pass data from child to parent
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  private _employeeId: number;
  confirmDelete = false; // variable to display delete confirmation .
  // panelExpanded = true; // used to implement accordian - expand/collapse
  // tslint:disable-next-line:whitespace
  @Input()
  public get employeeId(): number {
    return this._employeeId;
  }
  public set employeeId(value: number) {
    console.log('Value Changed from :' + this._employeeId + ' to: ' + value);
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
  selectedEmployeeId: number;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit() {
    // this variable is used in the display-employee style  panel-success to conditionally change style.
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }
  // Tracks the input chnages using ngOnChanges
  ngOnChanges(changes: SimpleChanges) {
    for (const propName of Object.keys(changes)) {
      console.log(propName);
      const change = changes[propName];
      const from = JSON.stringify(change.previousValue);
      const to = JSON.stringify(change.currentValue);
      console.log(propName + ' has changed from ' + from + ' to ' + to);
    }
    // const previousEmp =  <Employee>changes.emp.previousValue ;
    // const currentEmp = <Employee>changes.emp.currentValue;
    // console.log('Previous : ' + (previousEmp ? previousEmp.name: 'Null');
    // console.log('Current :' + currentEmp.name);

    // console.log(changes);
  }
  // this is used for output variable.
  handleClick() {
    this.notify.emit(this.emp.name);
  }
  getEmployeeNameAndGender(): string {
    return this.emp.contactPreference;
  }
  viewEmployee() {
    this._router.navigate(['/employees', this.emp.id], {
      queryParams: { searchTerm: this.searchTerm, testParam: 'testValue' }
    });
  }
  editEmployee() {
    this._router.navigate(['/edit', this.emp.id], {});
  }
  deleteEmployee() {
    this._employeeService
      .deleteEmployee(this.emp.id)
      .subscribe(
        () => console.log(`Employee with id=${this.emp.id} deleted.`),
        (err: any) => console.log(err)
      );
    this.notifyDelete.emit(this.emp.id);
    // this is to notify the parent list component about delete so that it can adjust the filter accordingly
  }
}
