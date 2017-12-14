export abstract class Unlockable {
  public id: number;
  public unlocked: boolean;
  public quantity: number;

  constructor(id: number, unlocked: boolean, quantity: number) {
    this.id = id;
    this.unlocked = unlocked;
    this.quantity = quantity;
  }
}
