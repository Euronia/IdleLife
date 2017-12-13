import {Unlockable} from './unlockable.model';

export class Producer extends Unlockable {

  public name: string;
  public production: Unlockable[];
  public prodPerSec: number;
  public price: number;
  public quantity: number;

  constructor(id: number, unlocked: boolean, name: string, production: Unlockable[], prodPerSec: number, price: number, quantity: number) {
    super(id, unlocked);
    this.name = name;
    this.production = production;
    this.prodPerSec = prodPerSec;
    this.price = price;
    this.quantity = quantity;
  }
}
