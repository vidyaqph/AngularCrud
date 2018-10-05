import { Component, OnInit } from "@angular/core";
import { Employee } from "../models/employee.model";

@Component({
  selector: "app-list-employees",
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.css"]
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [
    { id: 1,
    name: 'John',
    gender: 'Male',
    email: 'john@fdgdfg.com',
    contactPreference: 'Email',
    dateOfBirth: new Date('10/25/1988'),
    department: 'IT',
    isActive: true,
    photoPath: 'assets/images/John.png'
 },
 { id: 2,
  name: 'Mary',
  gender: 'Female',
  email: 'Mary@fdgdfg.com',
  contactPreference: 'Phone',
  phoneNumber: 1234324,
  dateOfBirth: new Date('1/25/1965'),
  department: 'HR',
  isActive: true,
  photoPath: 'assets/images/Mary.png'
},
{ id: 3,
  name: 'Jany',
  gender: 'Female',
  email: 'jany@fdgdfg.com',
  contactPreference: 'Email',
  dateOfBirth: new Date('1/20/1979'),
  department: 'HR',
  isActive: true,
  photoPath: 'assets/images/Jany.jpg'
}];
  constructor() {}

  ngOnInit() {}
}
