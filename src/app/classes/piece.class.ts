import { PieceColor } from '../enums/piece-color.enum';
import { PieceName } from '../enums/piece.enum';

export class Piece {
  id: number;
  name: PieceName;
  color: PieceColor;
  row: number;
  column: number;
  captured: boolean;
  moved: boolean;

  constructor(id: number, name: PieceName, color: PieceColor, row: number, column: number) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.row = row;
    this.column = column;
    this.captured = false;
    this.moved = false;
  }
}
