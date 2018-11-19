import { Component, OnInit } from '@angular/core';
import { Employee } from './models/employee.model';
import { Router } from '@angular/router';
import { EmployeeService } from './employees/employee.service';

@Component({
  selector: 'app-list-employees-with-highlighted',
  templateUrl: './list-employees-with-highlighted.component.html',
  styleUrls: ['./list-employees-with-highlighted.component.css']
})
export class ListEmployeesWithHighlightedComponent implements OnInit {
  employees: Employee[];
  employeeToDisplay: Employee;
  private arrayIndex = 1;
  dataFromChild: string;
  searchTerm: string;
  constructor(
    private _employeeService: EmployeeService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.employees = this._employeeService.getEmployee();
    this.employeeToDisplay = this.employees[0];
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
  onClick(empId: number) {
    this._router.navigate(['./employees', empId]);
  }
}
