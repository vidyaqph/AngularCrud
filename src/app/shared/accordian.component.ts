import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent implements OnInit {
  @Input() hasJustViewed: boolean; // this is to keep track of the last viewed record.
  @Input() title: string;
  @Input() isHidden: false;

  ngOnInit() {}
}
