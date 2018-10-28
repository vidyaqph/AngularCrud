// This is a child component of listEmployee component
import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
 @Input() emp: Employee; // Data comes from parent component listEmployee
  constructor() { }

  ngOnInit() {
  }

}
