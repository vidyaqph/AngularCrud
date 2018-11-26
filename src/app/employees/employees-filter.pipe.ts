import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from '../models/employee.model';

@Pipe({
  name: 'employeeFilter', // This name is used in html
  pure: false // false will make it impure pipe.
})
export class EmployeeFilterPipe implements PipeTransform {
  private counter = 0;
  transform(employees: Employee[], searchTerm: string): Employee[] {
    this.counter++; // To test impure pipe execution on every mousemove
    // console.log('Pipe Executed Counter : ' + this.counter);
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter(
      employee =>
        employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
