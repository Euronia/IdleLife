import { Component, OnInit } from '@angular/core';
import {Resource} from '../model/resource.model';
import {Producer} from '../model/producer.model';
import {Upgrade} from '../model/upgrade.model';
import {StatisticsService} from '../statistics/service/statistics.service';
import {Price} from '../model/price.model';
import {PrestigeCurrency} from '../model/prestige.model';
import {Character} from '../model/characters/character.model';
import {Bar} from '../model/bar/bar.model';

@Component({
  selector: 'app-game-controller',
  providers: [StatisticsService],
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit {

  workResources: Resource[] = [];
  coworkers: Character[] = [];
  workProducers: Producer[] = [];
  workUpgrades: Upgrade[] = [];
  prestiges: PrestigeCurrency[] = [];
  interval = 1000;
  last = 0;
  playerTime = 0;
  statsService: StatisticsService;
  producerUnlocked = false;
  upgradeUnlocked = false;
  activeTab = 'Work';
  selectedIndex = 0;

  //  HOME CONTROLLER

  // noinspection TsLint
  homeResources: Resource[] = [];
  // noinspection TsLint
  homeProducers: Producer[] = [];
  // noinspection TsLint
  homeUpgrades: Upgrade[] = [];

  // BAR CONTROLLER

  bar: Bar;
  barResources: Resource[] = [];
  barProducers: Producer[] = [];
  barUpgrades: Upgrade[] = [];


  constructor(statsService: StatisticsService) {
    this.statsService = statsService;
  }

  ngOnInit() {
    const workUnit = new Resource(1, true, 'WorkUnit', 0);
    this.workResources.push(workUnit);
    const happiness = new Resource(2, false, 'Happiness', 0);
    this.workResources.push(happiness);
    const worker = new Producer(1, false, 'Worker', [workUnit], 1, new Price(1, 10), 0, 10, 'Write some code that writes some code');
    this.workProducers.push(worker);
    const incrementals = new Producer(2, false, 'Incremental Game', [happiness], 1, new Price(2, 10), 0, 10,
            'Start playing a new incremental game');
    this.workProducers.push(incrementals);

    const incrementalUnlock = new Upgrade(1, false, 'Discover r/incremental_games', 0, 1, new Price(2, 20), false, null);
    this.workUpgrades.push(incrementalUnlock);

    const workDays = new PrestigeCurrency(1, false, 'Work days', 0, [new Price(1, 25)], 'Call it a day');
    this.prestiges.push(workDays);

    const homeDays = new PrestigeCurrency(2, false, 'Home days', 0, null, 'Go to sleep');
    this.prestiges.push(homeDays);

    this.coworkers.push(new Character());
    this.coworkers.push(new Character());
    this.coworkers.push(new Character());
    this.coworkers.push(new Character());



    workUnit.addUnlockableOnNumber(2, happiness);
    workUnit.addUnlockableOnNumber(5, worker);
    workUnit.addUnlockableOnNumber(25, workDays);
    happiness.addUnlockableOnNumber(20, incrementalUnlock);
    incrementalUnlock.addUnlockableOnNumber(1, incrementals);

    this.initHome();
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
      this.updatePrestiges();
      this.last = delta;
      }
    }

  updateProduction() {
    let coinsEarned: any = 0;
      this.workProducers.forEach(item => {
        item.production.forEach(producedItem => {
          producedItem.quantity += item.prodPerSec * item.quantity;
          coinsEarned += item.prodPerSec * item.quantity;
        });
    });
      return coinsEarned;
  }

  updateUnlockables() {
    if (this.workResources[0].quantity > 4) {
      this.producerUnlocked = true;
    }
    if (this.workResources[1].quantity > 19) {
      this.upgradeUnlocked = true;
    }
  }

  updateStatistics(earned: number) {
    StatisticsService.addRessources(earned);
  }

  updatePrestiges() {
    this.prestiges.forEach( item =>
    item.updateBuyable(this.workResources));
  }

  cheat(resource: Resource) {
    resource.quantity += 1000000000000;
  }

  writeCode() {
    this.workResources[0].changeQuantity(1);
  }

  slackReddit() {
    this.workResources[1].changeQuantity(1);
  }

  callItADay() {
    this.prestiges[0].changeQuantity(1);
    this.prestiges[0].buyable = false;
    if (this.prestiges[0].quantity % 5 === 0) {
      this.switchToTab('Home');
      this.selectedIndex = 1;
    }
    this.startWorkDay()
  }

  startWorkDay() {
    this.workProducers.forEach(item => item.prestigeWorkDay());
    this.workResources.forEach(item => item.quantity = 0);
  }

  switchToTab(tab: string) {
    this.activeTab = tab;
  }

  buy(producer: Producer) {
    const ressource = producer.price.unlockableId - 1;
    if (producer.getPrice() <= this.workResources[ressource].quantity) {
      this.workResources[ressource].quantity -= producer.getPrice();
      producer.changeQuantity(1);
    }
  }

  buyWorkUpgrade(upgrade: Upgrade) {
    const ressource = upgrade.price.unlockableId - 1;
    if (upgrade.price.size <= this.workResources[ressource].quantity) {
      this.workResources[ressource].quantity -= upgrade.price.size;
      upgrade.changeQuantity(1);
    }
  }

  initHome() {

    const energy = new Resource(1, true, 'Energy', 10);
    this.homeResources.push(energy);

    const upgPlayIncrementalHome = new Upgrade(1, false, 'Start playing your incremental games at home',
      0, 1.25, new Price(1, 5), false, this.workProducers[1]);
    this.homeUpgrades.push(upgPlayIncrementalHome);

    this.workProducers[1].addUnlockableOnNumber(1, upgPlayIncrementalHome);
  }

  buyHomeUpgrade(upgrade: Upgrade) {
    const ressource = upgrade.price.unlockableId - 1;
    if (upgrade.price.size <= this.homeResources[ressource].quantity) {
      this.homeResources[ressource].quantity -= upgrade.price.size;
      upgrade.changeQuantity(1);
    }
  }

  endHomeDay() {
    this.prestiges[1].changeQuantity(1);
    this.homeResources[0].quantity = 10;
    if (this.prestiges[1].quantity % 2 === 0) {
      this.selectedIndex = 0;
      this.switchToTab('Work');
      this.startWorkDay();
    }
  }

  goToBar() {
    this.startBar(this.coworkers);
    this.selectedIndex = 3;
    this.switchToTab('Bar');
  }

  startBar(participants) {
    this.bar = new Bar(participants);
  }

  initBar() {
    const liver_resistance = new Resource (1, true, 'Liver Resistance', 1000);
    this.barResources.push(liver_resistance);

    const alcohols = new Producer(1, true, 'Alcohol', [liver_resistance], -20,
      new Price(1, 1001), 1, 1, 'Alcohol is slowly but urely beating you');

    const chips = new Producer(2, true, 'Peanuts', [liver_resistance], 0.2,
      new Price(1, 1001), 1, 1, 'Alcohol is slowly but urely beating you');
  }

}
