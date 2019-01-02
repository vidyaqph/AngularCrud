import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { CreateEmployeeModelComponent } from './employees/create-employee-model.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
// Services
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { ListEmployeesWithHighlightedComponent } from './list-employees-with-highlighted.component';
import { EmployeeFilterPipe } from './employees/employees-filter.pipe';
import { EmployeeListResolverService } from './shared/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details_guard.service';
import { ListWithCrudComponent } from './employees/list-with-crud.component';
import { AccordianComponent } from './shared/accordian.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  {
    path: 'highlightedList',
    component: ListEmployeesWithHighlightedComponent,
    resolve: { employeeList: EmployeeListResolverService } // employeeList is key and can give any name
  },
  { path: 'create', component: CreateEmployeeComponent },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsGuardService]
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeModelComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: 'crud',
    component: ListWithCrudComponent,
    // canDeactivate: [CreateEmployeeCanDeactivateGuardService],
    resolve: { employeeList: EmployeeListResolverService }
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    CreateEmployeeModelComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    ListEmployeesWithHighlightedComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    ListWithCrudComponent,
    AccordianComponent
  ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true }), // Enable tracing of router navigation events.. Dont do in production
    FormsModule,
    HttpClientModule
  ],
  providers: [
    EmployeeService,
    CreateEmployeeCanDeactivateGuardService,
    EmployeeListResolverService,
    EmployeeDetailsGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
