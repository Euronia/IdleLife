import {Unlockable} from './unlockable.model';
import {Producer} from './producer.model';
import {Price} from './price.model';

export class Upgrade extends Unlockable {
  public name: string;
  public value: number; // TODO  Add an effect class to have different effects for the workUpgrades ?
  public price: Price;
  public bought: boolean;
  public upgradeObject: Producer;

  constructor(id: number, unlocked: boolean, name: string, quantity: number, value: number, price: Price,
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
      if (this.upgradeObject) {
        this.upgradeObject.setProdPerSec(this.upgradeObject.prodPerSec * this.value);
      }
      if (this.unlockables) {
        this.checkUnlockables();
      }
    }
  }
}
