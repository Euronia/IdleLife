import {Unlockable} from './unlockable.model';

export class Resource extends Unlockable {

  public name: string;


  constructor(id: number, unlocked: boolean, name: string, quantity: number) {
    super(id, name, unlocked, quantity);

  }
}
