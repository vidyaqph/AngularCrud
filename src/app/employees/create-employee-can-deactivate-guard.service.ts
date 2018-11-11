import { CanDeactivate } from '@angular/router';
import { CreateEmployeeModelComponent } from './create-employee-model.component';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

// This guard is for create-employee-model-component
@Injectable()
export class CreateEmployeeCanDeactivateGuardService
  implements CanDeactivate<CreateEmployeeModelComponent> {
  canDeactivate(component: CreateEmployeeModelComponent): boolean {
    if (component.createEmployeeForm.dirty) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }
}
