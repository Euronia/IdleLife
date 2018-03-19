import {Character} from '../characters/character.model';
import {Alcohol} from './alcohol.model';

export class Bar {
  private barNames = [
    'The Educated Melons Inn',
    'The Simple Leader Pub',
    'The Marvelous Axe',
    'The Dwarven Carrot',
    'The Unknown Knight Pub',
    'The Greasy Caterpillar Bar',
    'The Equal Horn',
    'The Dangerous Nugget',
    'The Frightening Harp Tavern',
    'The First Elephant Seal Pub'];

  public name;
  public participants: Character[];
  public alcohols: Alcohol[];

  constructor(participants: Character[]) {
    this.name = this.barNames[Math.floor(Math.random() * (this.barNames.length + 1))];
    this.participants = participants;
    this.alcohols = [];
  }
}
