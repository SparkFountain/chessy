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
  private gameState: GameState = inject(GameState);
  pieces = this.gameState.pieces;
  activePiece = this.gameState.activePiece;

  getPiece = this.gameState.getPiece.bind(this.gameState);

  constructor() {}

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

  rowToLetter(row: number): string {
    return String.fromCharCode(65 + row);
  }

  selectField(row: number, column: number): void {
    this.gameState.selectField(row, column);
  }
}
