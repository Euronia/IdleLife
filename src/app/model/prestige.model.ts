
import {Unlockable} from './unlockable.model';
import {Price} from './price.model';
import {Resource} from './resource.model';

export class PrestigeCurrency extends Unlockable {

  public prices: Price[];
  public description: string;

  constructor(id: number, unlocked: boolean, name: string, quantity: number, price: Price[], description: string) {
    super(id, name, unlocked, quantity);
    this.prices = price;
    this.description = description;
  }

  isBuyable(resources: Resource[]) {
    this.prices.forEach(item => {
      if (resources[item.unlockableId - 1].quantity < item.size) {
        return false;
      }
    });
    return true;
  }
}
