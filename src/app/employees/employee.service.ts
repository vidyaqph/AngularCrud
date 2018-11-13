import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";

@Injectable()
export class EmployeeService {
private listEmployees: Employee[] =  [
  { id: 1,
  name: 'John',
  gender: 'Male',
  email: 'john@fdgdfg.com',
  contactPreference: 'Email',
  dateOfBirth: new Date('10/25/1988'),
  department: '2',
  isActive: true,
  photoPath: 'assets/images/John.png',
},
{ id: 2,
name: 'Mary',
gender: 'Female',
email: 'Mary@fdgdfg.com',
contactPreference: 'Phone',
phoneNumber: 1234324,
dateOfBirth: new Date('1/25/1965'),
department: '4',
isActive: true,
photoPath: 'assets/images/Mary.png'
},
{ id: 3,
name: 'Jany',
gender: 'Female',
email: 'jany@fdgdfg.com',
contactPreference: 'Email',
dateOfBirth: new Date('1/20/1979'),
department: '1',
isActive: true,
photoPath: 'assets/images/Jany.jpg'
}];

getEmployee(): Employee[] {

  return this.listEmployees;
}
getEmployeeDetails(id:number): Employee {

  return this.listEmployees.find(x=>x.id === id);
}

saveEmployee(employee: Employee) {
  this.listEmployees.push(employee);
}
}
