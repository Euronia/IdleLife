import {Unlockable} from './unlockable.model';
import {Resource} from './resource.model';
import {Price} from './price.model';

export class Producer extends Resource {

  public name: string;
  public price: Price;
  public production: Unlockable[];
  public prodPerSec: number;
  public rateGrowth: number;
  public description: string;


  constructor(id: number, unlocked: boolean, name: string, production: Unlockable[], prodPerSec: number, price: Price,
              quantity: number, rateGrowth: number, description: string) {
    super(id, unlocked, name, quantity);
    this.production = production;
    this.prodPerSec = prodPerSec;
    this.price = price;
    this.rateGrowth = rateGrowth;
    this.description = description;
  }

  getPrice(): number {
    return Number((this.price.size * this.rateGrowth ** this.quantity).toFixed(2));
  }

  setProdPerSec (value: number) {
    this.prodPerSec = value;
  }

}
