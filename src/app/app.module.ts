import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { CreateEmployeeModelComponent } from './employees/create-employee-model.component';
import {SelectRequiredValidatorDirective} from './shared/select-required-validator.directive';

const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent},
  {path: 'create', component: CreateEmployeeComponent},
  {path: 'model', component: CreateEmployeeModelComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    CreateEmployeeModelComponent,
    SelectRequiredValidatorDirective
  ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
