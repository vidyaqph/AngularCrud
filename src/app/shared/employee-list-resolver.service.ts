import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../employees/employee.service';

// service which implements resolver
@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[]> {
  constructor(private _employeeService: EmployeeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Employee[]> {
    return this._employeeService.getEmployeeObservable();
  }
}
