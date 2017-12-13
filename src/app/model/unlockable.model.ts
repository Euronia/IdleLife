export abstract class Unlockable {
  public id: number;
  public unlocked: boolean;

  constructor(id: number, unlocked: boolean) {
    this.id = id;
    this.unlocked = unlocked;
  }
}
