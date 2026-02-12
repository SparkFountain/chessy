import { PieceName } from '../enums/piece.enum';

export class Piece {
  name: PieceName;
  color: 'white' | 'black';

  constructor(name: PieceName, color: 'white' | 'black') {
    this.name = name;
    this.color = color;
  }
}
