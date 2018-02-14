import {Component} from '@angular/core';

import {StatisticsService} from '../service/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  constructor() { }

  getRessources() {
    return StatisticsService.ressources;
  }
}
