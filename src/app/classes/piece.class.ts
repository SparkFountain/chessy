import { PieceName } from '../enums/piece.enum';

export class Piece {
  id: number;
  name: PieceName;
  color: 'white' | 'black';
  row: number;
  column: number;

  constructor(id: number, name: PieceName, color: 'white' | 'black', row: number, column: number) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.row = row;
    this.column = column;
  }
}
