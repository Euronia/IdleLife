import { Component, OnInit } from '@angular/core';
import {Resource} from '../model/resource.model';
import {Producer} from '../model/producer.model';
import {Upgrade} from '../model/upgrade.model';
import {StatisticsComponent} from '../statistics/component/statistics.component';
import {StatisticsService} from '../statistics/service/statistics.service';

@Component({
  selector: 'app-game-controller',
  providers: [StatisticsService],
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit {

  resources: Resource[] = [];
  producers: Producer[] = [];
  upgrades: Upgrade[] = [];
  interval = 1000;
  last = 0;
  statsService: StatisticsService;

  constructor(statsService: StatisticsService) {
    this.statsService = statsService;
  }

  ngOnInit() {
    const coins = new Resource(1, true, 'Coin', 0);
    this.resources.push(coins);
    const lemons = new Producer(1, true, 'Lemon', [coins], 1.67, 4, 1, 1.07);
    this.producers.push(lemons);
    const news = new Producer(2, true, 'News', [coins], 20, 60, 0, 1.15);
    this.producers.push(news);
    const car = new Producer(3, true, 'Car', [coins], 90, 720, 0, 1.14);
    this.producers.push(car);
    const pizza = new Producer(4, true, 'Pizza', [coins], 360, 8640, 0, 1.13);
    this.producers.push(pizza);
    const donut = new Producer(4, true, 'Donut', [coins], 2160, 103680, 0, 1.12);
    this.producers.push(donut);

    const lemonsUpgrade1 = new Upgrade(1, false, 'Making Lemonade', 0, 3, 500, false, lemons);
    this.upgrades.push(lemonsUpgrade1);
    const lemonsUpgrade2 = new Upgrade(2, false, 'Making More Lemonade', 0, 3, 500, false, lemons);
    this.upgrades.push(lemonsUpgrade2);
    lemons.addUnlockableOnNumber(2, lemonsUpgrade1);
    lemons.addUnlockableOnNumber(5, lemonsUpgrade2);
    setInterval(this.update.bind(this), this.interval);
  }

  update() {
    const now = new Date().getTime();
    const delta = now - this.last;

    if (delta > this.interval) {
      const earned = this.updateProduction();
      this.updateUnlockables();
      this.updateStatistics(earned);
      this.last = delta;
      }
    }

  updateProduction() {
    let coinsEarned: any = 0;
      this.producers.forEach(item => {
        item.production.forEach(producedItem => {
          producedItem.quantity += item.prodPerSec * item.quantity;
          coinsEarned += item.prodPerSec * item.quantity;
        });
    });
      return coinsEarned;
  }

  updateUnlockables() {}

  updateStatistics(earned: number) {
    StatisticsService.addRessources(earned);
  }

  cheat(resource: Resource) {
    resource.quantity += 1000000000000;
  }

  buy(producer: Producer) {
    if (producer.getPrice() <= this.resources[0].quantity) {
      this.resources[0].quantity -= producer.getPrice();
      producer.changeQuantity(1);
    }
  }

  buyUpgrade(upgrade: Upgrade) {
    if (upgrade.price <= this.resources[0].quantity) {
      upgrade.changeQuantity(1);
      this.resources[0].quantity -= upgrade.price;
    }
  }

}
