import { Component } from '@angular/core';
import { Piece } from '../classes/piece.class';
import { PieceName } from '../enums/piece.enum';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import {
  faChessKing,
  faChessQueen,
  faChessRook,
  faChessBishop,
  faChessKnight,
  faChessPawn,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  imports: [FontAwesomeModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  fields: Array<Array<Piece | null>> = [];

  constructor() {
    this.resetBoard();
  }

  private iconMap = {
    King: faChessKing,
    Queen: faChessQueen,
    Rook: faChessRook,
    Bishop: faChessBishop,
    Knight: faChessKnight,
    Pawn: faChessPawn,
  };

  getIcon(piece: Piece): IconDefinition {
    return this.iconMap[piece.name];
  }

  resetBoard(): void {
    this.fields = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));

    // white pawns
    for (let i = 0; i < 8; i++) {
      this.fields[1][i] = new Piece(PieceName.pawn, 'white');
    }

    // white rooks
    this.fields[0][0] = new Piece(PieceName.rook, 'white');
    this.fields[0][7] = new Piece(PieceName.rook, 'white');

    // white knights
    this.fields[0][1] = new Piece(PieceName.knight, 'white');
    this.fields[0][6] = new Piece(PieceName.knight, 'white');

    // white bishops
    this.fields[0][2] = new Piece(PieceName.bishop, 'white');
    this.fields[0][5] = new Piece(PieceName.bishop, 'white');

    // white queen
    this.fields[0][3] = new Piece(PieceName.queen, 'white');

    // white king
    this.fields[0][4] = new Piece(PieceName.king, 'white');

    // black pawns
    for (let i = 0; i < 8; i++) {
      this.fields[6][i] = new Piece(PieceName.pawn, 'black');
    }

    // black rooks
    this.fields[7][0] = new Piece(PieceName.rook, 'black');
    this.fields[7][7] = new Piece(PieceName.rook, 'black');

    // black knights
    this.fields[7][1] = new Piece(PieceName.knight, 'black');
    this.fields[7][6] = new Piece(PieceName.knight, 'black');

    // black bishops
    this.fields[7][2] = new Piece(PieceName.bishop, 'black');
    this.fields[7][5] = new Piece(PieceName.bishop, 'black');

    // black queen
    this.fields[7][3] = new Piece(PieceName.queen, 'black');

    // black king
    this.fields[7][4] = new Piece(PieceName.king, 'black');
  }

  createRandomPiece(): void {
    this.fields[0][0] = new Piece(PieceName.bishop, 'white');
  }

  rowToLetter(row: number): string {
    return String.fromCharCode(65 + row);
  }
}
