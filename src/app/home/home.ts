import { Component, inject } from '@angular/core';
import { Board } from '../board/board';
import { GameState } from '../services/game-state';
import { PieceColor } from '../enums/piece-color.enum';

@Component({
  selector: 'app-home',
  imports: [Board],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private gameState: GameState = inject(GameState);

  activeColor: PieceColor = this.gameState.activePieceColor();
}
