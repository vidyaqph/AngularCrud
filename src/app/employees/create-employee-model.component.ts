import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Department} from '../models/department.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {Employee} from '../models/employee.model';
import {EmployeeService} from './employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-employee-model',
  templateUrl: './create-employee-model.component.html',
  styleUrls: ['./create-employee-model.component.css']
})
export class CreateEmployeeModelComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee = {id: null, name: null , contactPreference: null, dateOfBirth: null , department: null , email:''
    , gender : null , isActive : null , phoneNumber : null , photoPath : null ,emailPattern:null, password: null , confirmPassword: null};

  isActive = true;
  previewPhoto = false;
  departments: Department[] = [
    {
      id: 1, name : 'Help Desk'
    },
    {
      id: 2 , name: 'IT'
    },
    {id: 3, name: 'Payroll'},
    {id: 4 , name: 'HR'}
  ];
  constructor(private _employeeService: EmployeeService, private _router: Router) {
    this.datePickerConfig = Object.assign({}, {containerClass: 'theme-dark-blue'});
  }

  ngOnInit() {}

  // SaveEmployee(newEmployee: Employee): void {
  //   console.log(newEmployee);
  // }
  SaveEmployee(): void {
    this._employeeService.saveEmployee(this.employee);
    this._router.navigate(['list']) ; // Navigate to route list
  }
  ShowPreview() {
    this.previewPhoto = !this.previewPhoto ;
  }

}
