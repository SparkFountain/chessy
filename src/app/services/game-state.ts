import { Injectable, signal } from '@angular/core';
import { Piece } from '../classes/piece.class';
import { PieceName } from '../enums/piece.enum';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private readonly _pieces = signal<Piece[]>(this.resetBoard());
  readonly pieces = this._pieces.asReadonly();

  private readonly _activePiece = signal<Piece | null>(null);
  readonly activePiece = this._activePiece.asReadonly();

  constructor() {
    this.resetBoard();
  }

  resetBoard(): Piece[] {
    let pieces = [];

    // white pawns
    for (let i = 0; i < 8; i++) {
      pieces.push(new Piece(1, PieceName.pawn, 'white', 1, i));
    }

    // white rooks
    pieces.push(new Piece(2, PieceName.rook, 'white', 0, 0));
    pieces.push(new Piece(3, PieceName.rook, 'white', 0, 7));

    // white knights
    pieces.push(new Piece(4, PieceName.knight, 'white', 0, 1));
    pieces.push(new Piece(5, PieceName.knight, 'white', 0, 6));

    // white bishops
    pieces.push(new Piece(6, PieceName.bishop, 'white', 0, 2));
    pieces.push(new Piece(7, PieceName.bishop, 'white', 0, 5));

    // white queen
    pieces.push(new Piece(8, PieceName.queen, 'white', 0, 3));

    // white king
    pieces.push(new Piece(9, PieceName.king, 'white', 0, 4));

    // black pawns
    for (let i = 0; i < 8; i++) {
      pieces.push(new Piece(10 + i, PieceName.pawn, 'black', 6, i));
    }

    // black rooks
    pieces.push(new Piece(18, PieceName.rook, 'black', 7, 0));
    pieces.push(new Piece(19, PieceName.rook, 'black', 7, 7));

    // black knights
    pieces.push(new Piece(20, PieceName.knight, 'black', 7, 1));
    pieces.push(new Piece(21, PieceName.knight, 'black', 7, 6));

    // black bishops
    pieces.push(new Piece(22, PieceName.bishop, 'black', 7, 2));
    pieces.push(new Piece(23, PieceName.bishop, 'black', 7, 5));

    // black queen
    pieces.push(new Piece(24, PieceName.queen, 'black', 7, 3));

    // black king
    pieces.push(new Piece(25, PieceName.king, 'black', 7, 4));

    return pieces;
  }

  getPiece(row: number, column: number): Piece | null {
    return this._pieces().find((piece) => piece.row === row && piece.column === column) || null;
  }

  selectField(row: number, column: number): void {
    const piece = this._pieces().find((piece) => piece.row === row && piece.column === column);

    if (this.activePiece()) {
      this._activePiece()!.row = row;
      this._activePiece()!.column = column;
      this._activePiece.set(null);

      return;
    }

    if (piece) {
      if (piece === this.activePiece()) {
        this._activePiece.set(null);
      } else {
        this._activePiece.set(piece);
      }
    }
  }
}
