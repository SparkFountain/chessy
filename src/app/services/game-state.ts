import { Injectable, signal } from '@angular/core';
import { Piece } from '../classes/piece.class';
import { PieceName } from '../enums/piece.enum';
import { PieceColor } from '../enums/piece-color.enum';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  private readonly _pieces = signal<Piece[]>(this.resetBoard());
  readonly pieces = this._pieces.asReadonly();

  private readonly _activePiece = signal<Piece | null>(null);
  readonly activePiece = this._activePiece.asReadonly();

  private readonly _activePieceColor = signal<PieceColor>(PieceColor.white);
  readonly activePieceColor = this._activePieceColor.asReadonly();

  constructor() {
    this.resetBoard();
  }

  resetBoard(): Piece[] {
    let pieces = [];

    // white pawns
    for (let i = 0; i < 8; i++) {
      pieces.push(new Piece(1, PieceName.pawn, PieceColor.white, 1, i));
    }

    // white rooks
    pieces.push(new Piece(2, PieceName.rook, PieceColor.white, 0, 0));
    pieces.push(new Piece(3, PieceName.rook, PieceColor.white, 0, 7));

    // white knights
    pieces.push(new Piece(4, PieceName.knight, PieceColor.white, 0, 1));
    pieces.push(new Piece(5, PieceName.knight, PieceColor.white, 0, 6));

    // white bishops
    pieces.push(new Piece(6, PieceName.bishop, PieceColor.white, 0, 2));
    pieces.push(new Piece(7, PieceName.bishop, PieceColor.white, 0, 5));

    // white queen
    pieces.push(new Piece(8, PieceName.queen, PieceColor.white, 0, 3));

    // white king
    pieces.push(new Piece(9, PieceName.king, PieceColor.white, 0, 4));

    // black pawns
    for (let i = 0; i < 8; i++) {
      pieces.push(new Piece(10 + i, PieceName.pawn, PieceColor.black, 6, i));
    }

    // black rooks
    pieces.push(new Piece(18, PieceName.rook, PieceColor.black, 7, 0));
    pieces.push(new Piece(19, PieceName.rook, PieceColor.black, 7, 7));

    // black knights
    pieces.push(new Piece(20, PieceName.knight, PieceColor.black, 7, 1));
    pieces.push(new Piece(21, PieceName.knight, PieceColor.black, 7, 6));

    // black bishops
    pieces.push(new Piece(22, PieceName.bishop, PieceColor.black, 7, 2));
    pieces.push(new Piece(23, PieceName.bishop, PieceColor.black, 7, 5));

    // black queen
    pieces.push(new Piece(24, PieceName.queen, PieceColor.black, 7, 3));

    // black king
    pieces.push(new Piece(25, PieceName.king, PieceColor.black, 7, 4));

    return pieces;
  }

  getPiece(row: number, column: number): Piece | null {
    return this._pieces().find((piece) => piece.row === row && piece.column === column) || null;
  }

  selectField(row: number, column: number): void {
    const piece = this._pieces().find((piece) => piece.row === row && piece.column === column);

    // active piece: check whether move is legal
    if (this.activePiece()) {
      const x1 = this.activePiece()!.column;
      const y1 = this.activePiece()!.row;
      const x2 = column;
      const y2 = row;

      // deactivate piece if same field is clicked
      if (x1 === x2 && y1 === y2) {
        this._activePiece.set(null);
        return;
      }

      let legalMove = false;
      console.log(
        `>>> ${this.activePiece()!.name} wants to move from (${x1}, ${y1}) to (${x2}, ${y2})`,
      );

      switch (this.activePiece()!.name) {
        case PieceName.pawn:
          legalMove = this.isLegalPawnMove(x1, y1, x2, y2, this.activePiece()!.color);
          break;
        case PieceName.knight:
          legalMove = this.isLegalKnightMove(x1, y1, x2, y2);
          break;
        case PieceName.bishop:
          legalMove = this.isLegalBishopMove(x1, y1, x2, y2);
          break;
        case PieceName.rook:
          legalMove = this.isLegalRookMove(x1, y1, x2, y2);
          break;
        case PieceName.queen:
          legalMove = this.isLegalQueenMove(x1, y1, x2, y2);
          break;
        case PieceName.king:
          legalMove = this.isLegalKingMove(x1, y1, x2, y2, this.activePiece()!.color);
          break;
      }

      if (legalMove) {
        this._activePiece()!.row = row;
        this._activePiece()!.column = column;
        console.log(`>>> ${this.activePiece()!.name} moved to (${x2}, ${y2})`);

        // pawn promotion?
        if (this.activePiece()!.name === PieceName.pawn && (y2 === 0 || y2 === 7)) {
          console.log(`>>> ${this.activePiece()!.name} promoted`);
          // TODO: implement pawn promotion for all possible pieces
          this._activePiece()!.name = PieceName.queen;
        }

        // check?
        // TODO: implement check detection

        // checkmate?
        // TODO: implement checkmate detection
      } else {
        console.log(`>>> ${this.activePiece()!.name} cannot move to (${x2}, ${y2})`);
      }

      // clear active piece in any case
      this._activePiece.set(null);
      return;
    }

    if (piece) {
      if (piece === this.activePiece()) {
        this._activePiece.set(null);
      }

      if (piece.color === this.activePieceColor()) {
        this._activePiece.set(piece);
        this._activePieceColor.set(
          this._activePieceColor() === PieceColor.white ? PieceColor.black : PieceColor.white,
        );
      }
    }
  }

  isLegalPawnMove(x1: number, y1: number, x2: number, y2: number, color: PieceColor): boolean {
    if (color === PieceColor.white) {
      // one step forward if field is empty
      if (x1 === x2 && y1 + 1 === y2 && this.getPiece(y2, x2) === null) {
        return true;
      }

      // two steps forward if field is empty and pawn is at starting position
      if (x1 === x2 && y1 + 2 === y2 && this.getPiece(y2, x2) === null && y1 === 1) {
        return true;
      }

      // one step diagonally if field is not empty
      if (Math.abs(x1 - x2) === 1 && y1 + 1 === y2 && this.getPiece(y2, x2) !== null) {
        return true;
      }
    } else {
      // one step forward if field is empty
      if (x1 === x2 && y1 - 1 === y2 && this.getPiece(y2, x2) === null) {
        return true;
      }

      // two steps forward if field is empty and pawn is at starting position
      if (x1 === x2 && y1 - 2 === y2 && this.getPiece(y2, x2) === null && y1 === 6) {
        return true;
      }

      // one step diagonally if field is not empty
      if (Math.abs(x1 - x2) === 1 && y1 - 1 === y2 && this.getPiece(y2, x2) !== null) {
        return true;
      }
    }

    // TODO: missing en passant

    return false;
  }

  isLegalKnightMove(x1: number, y1: number, x2: number, y2: number): boolean {
    // L-shaped move: 2 squares in one direction, 1 square perpendicular
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  }

  isLegalBishopMove(x1: number, y1: number, x2: number, y2: number): boolean {
    // Diagonal move: same number of squares horizontally and vertically
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    // Check whether no pieces are in the way
    for (let i = 1; i < dx; i++) {
      const x = x1 + (x2 > x1 ? i : -i);
      const y = y1 + (y2 > y1 ? i : -i);
      const pieceInWay = this.getPiece(y, x);

      if (pieceInWay && pieceInWay.color === this.activePieceColor()) {
        return false;
      }
    }

    return dx === dy && dx > 0;
  }

  isLegalRookMove(x1: number, y1: number, x2: number, y2: number): boolean {
    // Horizontal or vertical move
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    // Check whether no pieces are in the way
    for (let i = 1; i < dx; i++) {
      const x = x1 + (x2 > x1 ? i : -i);
      const y = y1 + (y2 > y1 ? i : -i);
      const pieceInWay = this.getPiece(y, x);

      if (pieceInWay && pieceInWay.color === this.activePieceColor()) {
        return false;
      }
    }

    return (dx === 0 && dy > 0) || (dx > 0 && dy === 0);
  }

  isLegalQueenMove(x1: number, y1: number, x2: number, y2: number): boolean {
    // Horizontal, vertical or diagonal move
    return this.isLegalRookMove(x1, y1, x2, y2) || this.isLegalBishopMove(x1, y1, x2, y2);
  }

  isLegalKingMove(x1: number, y1: number, x2: number, y2: number, color: PieceColor): boolean {
    // TODO: implement king movement
    return false;
  }
}
