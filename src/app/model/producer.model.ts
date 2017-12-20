import {Unlockable} from './unlockable.model';
import {Resource} from './resource.model';

export class Producer extends Resource {

  public name: string;
  public production: Unlockable[];
  public prodPerSec: number;
  public basePrice: number;
  public rateGrowth: number;


  constructor(id: number, unlocked: boolean, name: string, production: Unlockable[], prodPerSec: number, price: number,
              quantity: number, rateGrowth: number) {
    super(id, unlocked, name, quantity);
    this.production = production;
    this.prodPerSec = prodPerSec;
    this.basePrice = price;
    this.rateGrowth = rateGrowth;
  }

  getPrice(): number {
    return Number((this.basePrice * this.rateGrowth ** this.quantity).toFixed(2));
  }

  setProdPerSec (value: number) {
    this.prodPerSec.toFixed(2);
  }

}
