import {Unlockable} from './unlockable.model';
import {Producer} from './producer.model';

export class Upgrade extends Unlockable {
  public name: string;
  public value: number; // TODO  Add an effect class to have different effects for the upgrades ?
  public price: number;
  public bought: boolean;
  public upgradeObject: Producer;

  constructor(id: number, unlocked: boolean, name: string, quantity: number, value: number, price: number,
              bought: boolean, upgradeObject: Producer) {
    super(id, name, unlocked, quantity);
    this.value = value;
    this.price = price;
    this.bought = bought;
    this.upgradeObject = upgradeObject;
  }

  changeQuantity(change: number) {
    if (!this.bought) {
      this.quantity += 1;
      this.bought = true;
      this.upgradeObject.setProdPerSec(this.upgradeObject.prodPerSec * this.value);
    }
  }
}
