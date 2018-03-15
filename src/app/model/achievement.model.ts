

import {Unlockable} from './unlockable.model';

export class Achievement extends Unlockable {

  description: string;

  constructor(id: number, name: string, unlocked: boolean, quantity: number, description: string) {
    super(id, name, unlocked, quantity);
    this.description = description;
  }

}
