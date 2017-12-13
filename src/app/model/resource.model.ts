import {Unlockable} from './unlockable.model';

export class Resource extends Unlockable {

  public name: string;
  public quantity: number;

  constructor(id: number, unlocked: boolean, name: string, quantity: number) {
    super(id, unlocked);
    this.name = name;
    this.quantity = quantity;
  }
}
