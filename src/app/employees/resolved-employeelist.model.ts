import { Employee } from '../models/employee.model';

// this type is used to catch employee service error in resolver service. if the call is success, employeeList contain data
// other wise error contain error
export class ResolvedEmployeeList {
  constructor(public employeeList: Employee[], public error: any = null) {}
}
