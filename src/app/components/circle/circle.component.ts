import { Component, Input, OnInit } from '@angular/core';
import { ClockData } from '../../models/interface';

@Component({
  selector: 'clock-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.less']
})
export class CircleComponent implements OnInit {
  @Input() public data!: ClockData;

  constructor() { }

  ngOnInit(): void {
  }

}
