import {Unlockable} from '../unlockable.model';
import {MatSnackBar} from '@angular/material';

export class Skill extends Unlockable{

  public experience: number;
  public energyToTrain: number;

  constructor(id: number, name: string, unlocked: boolean, quantity: number) {
    super(id, name, unlocked, quantity);
    this.experience = 0;
    this.energyToTrain = 2;
  }

  public gainExperience(quantity: number) {
    this.experience += quantity;
    if (this.experience >= 10) {
      this.changeQuantity(1);
      this.experience -= 10;
    }
  }
}
