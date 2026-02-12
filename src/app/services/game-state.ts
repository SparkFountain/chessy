import { Injectable } from '@angular/core';
import { Piece } from '../classes/piece.class';
import { PieceName } from '../enums/piece.enum';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  pieces: Piece[] = [];
  activePiece: Piece | null = null;

  constructor() {
    this.resetBoard();
  }

  resetBoard(): void {
    this.pieces = [];

    // white pawns
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Piece(1, PieceName.pawn, 'white', 1, i));
    }

    // white rooks
    this.pieces.push(new Piece(2, PieceName.rook, 'white', 0, 0));
    this.pieces.push(new Piece(3, PieceName.rook, 'white', 0, 7));

    // white knights
    this.pieces.push(new Piece(4, PieceName.knight, 'white', 0, 1));
    this.pieces.push(new Piece(5, PieceName.knight, 'white', 0, 6));

    // white bishops
    this.pieces.push(new Piece(6, PieceName.bishop, 'white', 0, 2));
    this.pieces.push(new Piece(7, PieceName.bishop, 'white', 0, 5));

    // white queen
    this.pieces.push(new Piece(8, PieceName.queen, 'white', 0, 3));

    // white king
    this.pieces.push(new Piece(9, PieceName.king, 'white', 0, 4));

    // black pawns
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Piece(10 + i, PieceName.pawn, 'black', 6, i));
    }

    // black rooks
    this.pieces.push(new Piece(18, PieceName.rook, 'black', 7, 0));
    this.pieces.push(new Piece(19, PieceName.rook, 'black', 7, 7));

    // black knights
    this.pieces.push(new Piece(20, PieceName.knight, 'black', 7, 1));
    this.pieces.push(new Piece(21, PieceName.knight, 'black', 7, 6));

    // black bishops
    this.pieces.push(new Piece(22, PieceName.bishop, 'black', 7, 2));
    this.pieces.push(new Piece(23, PieceName.bishop, 'black', 7, 5));

    // black queen
    this.pieces.push(new Piece(24, PieceName.queen, 'black', 7, 3));

    // black king
    this.pieces.push(new Piece(25, PieceName.king, 'black', 7, 4));
  }

  createRandomPiece(): void {
    // this.fields[0][0] = new Piece(PieceName.bishop, 'white');
  }
}
