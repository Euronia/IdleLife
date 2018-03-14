
import {Unlockable} from './unlockable.model';

export class PrestigeCurrency extends Unlockable {

  constructor(id: number, name: string, unlocked: boolean, quantity: number) {
    super(id, name, unlocked, quantity);
  }

}
