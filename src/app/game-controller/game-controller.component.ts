import { Component, OnInit } from '@angular/core';
import {Resource} from '../model/resource.model';
import {Producer} from '../model/producer.model';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit {

  resources: Resource[] = [];
  producers: Producer[] = [];

  constructor() { }

  ngOnInit() {
    const coins = new Resource(1, true, 'Coin', 10);
    this.resources.push(coins);
    const workers = new Producer(1, true, 'Worker', [coins], 1, 5, 0);
    this.producers.push(workers);
  }
}
