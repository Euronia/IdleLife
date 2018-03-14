import { Component, OnInit } from '@angular/core';
import {Resource} from '../model/resource.model';
import {Producer} from '../model/producer.model';
import {Upgrade} from '../model/upgrade.model';
import {StatisticsComponent} from '../statistics/component/statistics.component';
import {StatisticsService} from '../statistics/service/statistics.service';
import {Price} from '../model/price.model';
import {PrestigeCurrency} from '../model/prestige.model';

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
  prestiges: PrestigeCurrency[] = [];
  interval = 1000;
  last = 0;
  playerTime = 0;
  statsService: StatisticsService;
  producerUnlocked = false;
  upgradeUnlocked = false;

  constructor(statsService: StatisticsService) {
    this.statsService = statsService;
  }

  ngOnInit() {
    const workUnit = new Resource(1, true, 'WorkUnit', 0);
    this.resources.push(workUnit);
    const happiness = new Resource(2, false, 'Happiness', 0);
    this.resources.push(happiness);
    const worker = new Producer(1, false, 'Worker', [workUnit], 1, new Price(1, 10), 0, 10, 'Write some code that writes some code');
    this.producers.push(worker);
    const incrementals = new Producer(2, false, 'Incremental Game', [happiness], 1, new Price(2, 10), 0, 10,
            'Start playing a new incremental game');
    this.producers.push(incrementals);

    const incrementalUnlock = new Upgrade(1, false, 'Discover r/incremental_games', 0, 1, new Price(2, 20), false, null);
    this.upgrades.push(incrementalUnlock);

    const workDays = new PrestigeCurrency(1, false, 'Work days', 0, [new Price(1, 250)], 'Call it a day');
    this.prestiges.push(workDays);

    workUnit.addUnlockableOnNumber(2, happiness);
    workUnit.addUnlockableOnNumber(5, worker);
    workUnit.addUnlockableOnNumber(25, workDays);
    happiness.addUnlockableOnNumber(20, incrementalUnlock);
    incrementalUnlock.addUnlockableOnNumber(1, incrementals);
    setInterval(this.update.bind(this), this.interval);
  }

  update() {
    const now = new Date().getTime();
    const delta = now - this.last;
    this.playerTime += delta;

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

  updateUnlockables() {
    if (this.resources[0].quantity > 4) {
      this.producerUnlocked = true;
    }
    if (this.resources[1].quantity > 19) {
      this.upgradeUnlocked = true;
    }
  }

  updateStatistics(earned: number) {
    StatisticsService.addRessources(earned);
  }

  cheat(resource: Resource) {
    resource.quantity += 1000000000000;
  }

  writeCode() {
    this.resources[0].changeQuantity(1);
  }

  slackReddit() {
    this.resources[1].changeQuantity(1);
  }

  callItADay() {
    this.producers.forEach(item => item.prestigeWorkDay());
    this.resources.forEach(item => item.quantity = 0);
  }

  buy(producer: Producer) {
    const ressource = producer.price.unlockableId - 1;
    if (producer.getPrice() <= this.resources[ressource].quantity) {
      this.resources[ressource].quantity -= producer.getPrice();
      producer.changeQuantity(1);
    }
  }

  buyUpgrade(upgrade: Upgrade) {
    const ressource = upgrade.price.unlockableId - 1;
    if (upgrade.price.size <= this.resources[ressource].quantity) {
      this.resources[ressource].quantity -= upgrade.price.size;
      upgrade.changeQuantity(1);
    }
  }

}
