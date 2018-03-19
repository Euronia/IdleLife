export abstract class Unlockable {
  public id: number;
  public name: string;
  public unlocked: boolean;
  public quantity: number;
  public unlockables: Unlockable[];
  public unlockableNumber: number;

  constructor(id: number, name: string, unlocked: boolean, quantity: number) {
    this.id = id;
    this.name = name;
    this.unlocked = unlocked;
    this.quantity = quantity;
    this.unlockables = [];
  }

  addUnlockableOnNumber(size: number, unlockable: Unlockable) {
    unlockable.unlockableNumber = size;
    this.unlockables.push(unlockable);
  }

  changeQuantity(change: number) {
    this.quantity += change;
    if (this.unlockables) {
      this.checkUnlockables();
    }
  }

  checkUnlockables() {
    if (this.unlockables.length !== 0) {
      this.unlockables.filter( u => !u.unlocked).forEach(unlockable => {
        if (this.quantity >= unlockable.unlockableNumber) {
          unlockable.unlocked = true;
          const index = this.unlockables.indexOf(unlockable, 0);
        }
      });
    }
  }

}
