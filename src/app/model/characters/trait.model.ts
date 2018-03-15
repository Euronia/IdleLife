import {ActionType} from './actiontype.enum';

export class Trait {

  values: Array<[ActionType, number]>;

  getModifier(action: ActionType) {
    if (action in this.values.keys) {
      return this.values[action];
    }
  }
}
