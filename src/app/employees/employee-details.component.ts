import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
// Displays employee details
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _id: number;
  constructor(
    private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _router: Router
  ) {}

  ngOnInit() {
    // Gets parameter id from route. + converts string to number
    // this._id = +this._route.snapshot.paramMap.get('id');
    // this.employee = this._employeeService.getEmployeeDetails(this._id);

    // Get parameter id using observables.
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this.employee = this._employeeService.getEmployeeDetails(this._id);
    });
  }
  viewNextEmployee() {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }
    this._router.navigate(['/employees', this._id]);
  }
}
