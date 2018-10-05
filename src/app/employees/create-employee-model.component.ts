import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Department} from '../models/department.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-employee-model',
  templateUrl: './create-employee-model.component.html',
  styleUrls: ['./create-employee-model.component.css']
})
export class CreateEmployeeModelComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  gender = 'female';
  contactPref = 'email';
  isActive = true;
  department = '3';
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
  constructor() {
    this.datePickerConfig = Object.assign({}, {containerClass: 'theme-dark-blue'});
  }

  ngOnInit() {}

  SaveEmployee(empForm: NgForm): void {
    console.log(empForm.value);
  }
  ShowPreview()
  {
    this.previewPhoto = !this.previewPhoto ;
  }

}
