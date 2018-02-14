import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class StatisticsService implements OnInit {

  constructor() {StatisticsService.ressources = 0; }

  static ressources: number;
  time: any;

  public static getRessources(): any {
    return StatisticsService.ressources;
  }

  public static addRessources(addValue: number) {
    StatisticsService.ressources += addValue;
  }

  ngOnInit(): void {

  }

}
