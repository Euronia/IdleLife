export abstract class Unlockable {
  public id: number;
  public name: string;
  public unlocked: boolean;
  public quantity: number;
  public unlockable: Unlockable; // TODO add several unlockables to a single Unlockable
  public unlockableNumber: number;

  constructor(id: number, name: string, unlocked: boolean, quantity: number) {
    this.id = id;
    this.name = name;
    this.unlocked = unlocked;
    this.quantity = quantity;
  }

  addUnlockableOnNumber(size: number, unlockable: Unlockable) {
    this.unlockable = unlockable;
    this.unlockableNumber = size;
  }

  changeQuantity(change: number) {
    this.quantity += change;
    if (this.unlockable) {
      this.checkUnlockables();
    }
  }

  checkUnlockables() {
    if (this.quantity >= this.unlockableNumber) {
      this.unlockable.unlocked = true;
      this.unlockable = null;
    }
  }
}
