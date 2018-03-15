import {Trait} from './trait.model';

export class Character {

  public name: string;
  public affection: number;
  public traits: Trait[];

  private prenoms = ['Shasta', 'Kayleen', 'Josefine', 'Victorina', 'Benita', 'Brigette', 'Miquel', 'Jennifer',
    'Lawanna', 'Nerissa', 'Kiyoko', 'Neely', 'Cecelia', 'Carroll', 'Mollie', 'Rena', 'Kandice', 'Aurora', 'Rosamaria',
    'Raleigh', 'Nilsa', 'Eleanora', 'Aron', 'Alexandria', 'Kristel', 'Rocco', 'Berniece', 'Esperanza', 'Justin',
    'Wilford', 'Margeret', 'Keely', 'Loretta', 'Hedy', 'Wilmer', 'Christoper', 'Bethel', 'Agnus', 'Migdalia',
    'Erich', 'Candance', 'Colby', 'Tijuana', 'Fran', 'Sacha', 'Yuko', 'Thalia', 'Bella', 'Zita', 'Toney'
  ];

  constructor() {
    this.name = this.prenoms[Math.floor(Math.random() * (this.prenoms.length + 1))];
    this.affection = 0;
    this.traits = null;
  }
}
