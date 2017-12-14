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
  interval = 1000;
  last = 0;

  constructor() { }

  ngOnInit() {
    const coins = new Resource(1, true, 'Coin', 10);
    this.resources.push(coins);
    const workers = new Producer(1, true, 'Worker', [coins], 1, 5, 1);
    this.producers.push(workers);
    const team = new Producer(2, true, 'Team', [workers], 1, 50, 0);
    this.producers.push(team);

    setInterval(this.update.bind(this), this.interval);
  }

  update() {
    const now = new Date().getTime();
    const delta = now - this.last;

    if (delta > this.interval) {
      this.producers.forEach(item => {
        item.production.forEach(producedItem => {
          producedItem.quantity += item.prodPerSec * item.quantity;
        });
        this.last = delta;
      });
    }
  }

  buy(producer: Producer) {
    if (producer.price <= this.resources[0].quantity) {
      producer.quantity += 1;
      this.resources[0].quantity -= producer.price;
      producer.price *= 2;
    }
  }

}
