import { Component, inject } from '@angular/core';
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
import { GameState } from '../services/game-state';

@Component({
  selector: 'app-board',
  imports: [FontAwesomeModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  fields: Array<Array<Piece | null>> = [];

  private gameState: GameState = inject(GameState);

  constructor() {
    this.initBoard();
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

  initBoard(): void {
    this.fields = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
    this.gameState.pieces.forEach((piece) => {
      this.fields[piece.row][piece.column] = piece;
    });
  }

  rowToLetter(row: number): string {
    return String.fromCharCode(65 + row);
  }
}
