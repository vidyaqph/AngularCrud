import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'; // used to return observable
import 'rxjs/add/operator/delay'; // used to introduce delay
import 'rxjs/add/operator/catch'; // include catch
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}
  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'John',
      gender: 'male',
      email: 'john@fdgdfg.com',
      contactPreference: 'Email',
      dateOfBirth: new Date('10/25/1988'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/John.png'
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'female',
      email: 'Mary@fdgdfg.com',
      contactPreference: 'Phone',
      phoneNumber: 1234324,
      dateOfBirth: new Date('1/25/1965'),
      department: '4',
      isActive: true,
      photoPath: 'assets/images/Mary.png'
    },
    {
      id: 3,
      name: 'Jany',
      gender: 'female',
      email: 'jany@fdgdfg.com',
      contactPreference: 'Email',
      dateOfBirth: new Date('1/20/1979'),
      department: '1',
      isActive: true,
      photoPath: 'assets/images/Jany.jpg'
    }
  ];

  getEmployee(): Employee[] {
    return this.listEmployees;
  }
  getEmployeeObservable(): Observable<Employee[]> {
    // return Observable.of(this.listEmployees).delay(2000); // static list
    return this.httpClient
      .get<Employee[]>('http://localhost:3000/employees')
      .pipe(catchError(this.handleError)); // Rxjs Pipeable operator
    //  .catch(this.handleError); // Patch operator
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log(errorResponse.error.message);
    } else {
      console.log('Server side error: ' + errorResponse);
    }
    return new ErrorObservable('There is a problem with the service');
  }

  getEmployeeDetails(id: number): Employee {
    return this.listEmployees.find(x => x.id === id);
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    // return type Observable<Employee> is required only when using post to server.
    // not needed for static data array
    if (employee.id === null) {
      // commenting as this will be done in server side service.
      // reduce will loop through all the the elements
      // const maxId = this.listEmployees.reduce(function(e1, e2) {
      //   return e1.id > e2.id ? e1 : e2;
      // }).id;
      // employee.id = maxId + 1;
      // this.listEmployees.push(employee);

      return this.httpClient
        .post<Employee>('http://localhost:3000/employees', employee, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        })
        .pipe(catchError(this.handleError));
    } else {
      const foundIndex = this.listEmployees.findIndex(
        emp => emp.id === employee.id
      );
      this.listEmployees[foundIndex] = employee;
    }
  }
  deleteEmployee(id: number) {
    const idx = this.listEmployees.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.listEmployees.splice(idx, 1); // delete an element from specified index
    }
  }
}
