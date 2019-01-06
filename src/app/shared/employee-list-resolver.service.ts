import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
import { ResolvedEmployeeList } from '../employees/resolved-employeelist.model';
import { map, catchError } from 'rxjs/operators';

// service which implements resolver
@Injectable()
export class EmployeeListResolverService
  implements Resolve<ResolvedEmployeeList> {
  constructor(private _employeeService: EmployeeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResolvedEmployeeList> {
    return this._employeeService.getEmployeeObservable().pipe(
      map(employeeList => new ResolvedEmployeeList(employeeList)), // success
      catchError((
        err: any // error
      ) => Observable.of(new ResolvedEmployeeList(null, err)))
    );
  }
}
