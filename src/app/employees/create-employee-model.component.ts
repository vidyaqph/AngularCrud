import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee-model',
  templateUrl: './create-employee-model.component.html',
  styleUrls: ['./create-employee-model.component.css']
})
export class CreateEmployeeModelComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  // This is used to reference this component to check whether form is dirty or not in CanDeactivateGuard
  datePickerConfig: Partial<BsDatepickerConfig>;
  panelTitle: string;
  employee: Employee = {
    id: null,
    name: null,
    contactPreference: null,
    dateOfBirth: null,
    department: null,
    email: '',
    gender: null,
    isActive: null,
    phoneNumber: null,
    photoPath: null,
    emailPattern: null,
    password: null,
    confirmPassword: null
  };

  isActive = true;
  previewPhoto = false;
  departments: Department[] = [
    {
      id: 1,
      name: 'Help Desk'
    },
    {
      id: 2,
      name: 'IT'
    },
    { id: 3, name: 'Payroll' },
    { id: 4, name: 'HR' }
  ];
  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.datePickerConfig = Object.assign(
      {},
      { containerClass: 'theme-dark-blue' }
    );
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parammeterMap => {
      const id = +parammeterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        contactPreference: null,
        dateOfBirth: null,
        department: null,
        email: '',
        gender: null,
        isActive: null,
        phoneNumber: null,
        photoPath: null,
        emailPattern: null,
        password: null,
        confirmPassword: null
      };
      this.createEmployeeForm.reset(); // this is to reset all validation errors also .
      this.panelTitle = 'Create Employee';
    } else {
      // this code will update the employee data even when data is not saved as it is a reference variable and forms is bound to this
      // this.employee = this._employeeService.getEmployeeDetails(id);
      // Inorder to avoid reference issue use object.assign so that the variables are copied to a new variable and assign that variable
      this.panelTitle = 'Edit Employee';
      this.employee = Object.assign(
        {},
        this._employeeService.getEmployeeDetails(id)
      );
    }
  }

  // SaveEmployee(newEmployee: Employee): void {
  //   console.log(newEmployee);
  // }
  SaveEmployee(empForm: NgForm): void {
    const newEmployee: Employee = Object.assign({}, this.employee); // Created to copy data and reference of employee obj
    // so that employee data from the model is preserved during reset.
    this._employeeService.saveEmployee(newEmployee);
    empForm.reset({
      name: 'Test User', // Sets default value
      contactPreference: 'phone'
    });
    // this.createEmployeeForm.reset(); // ViewChild can also be used to reset the form.
    // this._router.navigate(['list']); // Navigate to route list
    this._router.navigate(['highlightedList']);
  }
  ShowPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
}
