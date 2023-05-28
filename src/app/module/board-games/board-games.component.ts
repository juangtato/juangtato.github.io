import { Component, OnInit } from '@angular/core';
import { BoardGame, BoardGames } from './model/board-games.model';
import { BoardGamesService } from './service/board-games.service';
import { LoadingService } from '../../ui/layout/service/loading.service';

@Component({
  selector: 'app-board-games',
  templateUrl: './board-games.component.html',
  styleUrls: ['./board-games.component.scss']
})
export class BoardGamesComponent implements OnInit {

  data?: BoardGames;

  gameList: Array<BoardGame> = [];

  constructor(
    private boardGamesService: BoardGamesService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.start();
    this.boardGamesService.get().subscribe({
      next: d => {
        this.data = d;
        this.gameList = Object.entries(d.games).map(([, g]) => g).sort((a, b) => a.name.localeCompare(b.name));
        this.loadingService.stop();
      },
      error: e => {
        console.log('Communication error', e);
        this.loadingService.stop();
      }
    });
  }

}
