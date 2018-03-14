
import {Unlockable} from './unlockable.model';
import {Price} from './price.model';
import {Resource} from './resource.model';

export class PrestigeCurrency extends Unlockable {

  public prices: Price[];
  public description: string;
  public buyable: boolean;

  constructor(id: number, unlocked: boolean, name: string, quantity: number, price: Price[], description: string) {
    super(id, name, unlocked, quantity);
    this.prices = price;
    this.description = description;
    this.buyable = false;
  }

  updateBuyable(resources: Resource[]) {
    let buyable = true;
    this.prices.forEach(item => {
      if (resources[item.unlockableId - 1].quantity < item.size) {
        buyable = false;
      }
    });
    this.buyable = buyable;
  }
}
