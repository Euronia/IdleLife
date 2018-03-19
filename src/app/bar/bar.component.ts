import { Component, OnInit } from '@angular/core';
import {Bar} from '../model/bar/bar.model';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  bar: Bar;

  constructor() { }

  ngOnInit() {

  }

  startBar(participants) {
    this.bar = new Bar(participants);
  }

}
