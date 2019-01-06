import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employees/employee.service';

@Component({
  selector: 'app-list-with-crud',
  templateUrl: './list-with-crud.component.html',
  styleUrls: ['./list-with-crud.component.css']
})
export class ListWithCrudComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[]; // Used to keep filtered list,so that employees variable
  // will be unaffected.if we use employees variable itself, we will lose original list.
  employeeToDisplay: Employee;
  private arrayIndex = 1;
  dataFromChild: string;

  // searchTerm: string; //Used for testing filtering using pipe
  private _searchTerm: string; // CHnaging to property to use for data filtering in component.
  error: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    // when the search term changes this gets executed.
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
    // this.employees.filter(data => data.name.toLowerCase() === this.searchTerm.toLowerCase());
  }

  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    // this will get data from resolver service. the key will be the same key used in resolve section in app modules
    // to add resolver service. this will load the page when all the display elements are ready while clicking on a link
    // this rewrite will help to avoid displaying blank page (after the delay which is introduced in the employee service)
    // this.employees = this._route.snapshot.data['employeeList'];
    // this.filteredEmployees = this.employees;
    const resolvedEmployeeList = this._route.snapshot.data['employeeList']; // get resolver service data using new type which contain error property
    if (resolvedEmployeeList.error === null) {
      this.employees = resolvedEmployeeList.employeeList;
      this.filteredEmployees = this.employees;
    } else {
      this.error = resolvedEmployeeList.error;
    }
    // Snapshot approach to read query param
    // if (this._route.snapshot.queryParamMap.has('searchTerm')) {
    //   this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    // } else {
    //   this.filteredEmployees = this.employees;
    // }
    /* Observable approach */
    this._route.queryParamMap.subscribe(queryparams => {
      if (queryparams.has('searchTerm')) {
        this.searchTerm = queryparams.get('searchTerm');
      }
    });
  }

  ngOnInit() {
    // Code is commented to use move
    // // this.employees = this._employeeService.getEmployee(); // without observable
    // // With observable
    // this._employeeService.getEmployeeObservable().subscribe(empList => {
    //   this.employees = empList;
    //   this.employeeToDisplay = this.employees[0];
    //   this.filteredEmployees = this.employees;
    //   // Snapshot approach to read query param
    //   // if (this._route.snapshot.queryParamMap.has('searchTerm')) {
    //   //   this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    //   // } else {
    //   //   this.filteredEmployees = this.employees;
    //   // }
    //   /* Observable approach */
    //   this._route.queryParamMap.subscribe(queryparams => {
    //     if (queryparams.has('searchTerm')) {
    //       this.searchTerm = queryparams.get('searchTerm');
    //     }
    //   });
    //   //
    // });
    // console.log('has ' + this._route.snapshot.queryParamMap.has('searchTerm'));
    // console.log('get ' + this._route.snapshot.queryParamMap.get('searchTerm'));
    // console.log(
    //   'getall ' + this._route.snapshot.queryParamMap.getAll('searchTerm')
    // );
    // console.log('keys ' + this._route.snapshot.queryParamMap.keys); // Get query param.
    // console.log('keys ' + this._route.snapshot.paramMap.keys); // Get optional or required parameter.
  }
  filterEmployees(value: string): Employee[] {
    // return this.employees.filter(
    //   data => data.name.toLowerCase() === value.toLowerCase()  // this does not work.
    // );
    return this.employees.filter(
      data => data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  nextEmployee(): void {
    if (this.arrayIndex < this.employees.length) {
      this.employeeToDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else {
      this.employeeToDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }
  handleNotify(eventData: string) {
    this.dataFromChild = eventData;
  }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan'; // Change for primitive type change to test  pipe - pure pipe detects this
    // const newEmployeesArray: Employee[] = Object.assign([], this.employees); // creating 2 diff object references
    // // Note : need to put [] for array.otherwise won't work.
    // newEmployeesArray[0].name = 'Jordan';
    // this.employees = newEmployeesArray; // changing objet reference- pure pipe detects this.
    this.filteredEmployees = this.filterEmployees(this.searchTerm); // to see the name chnage during filtering
  }
  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
