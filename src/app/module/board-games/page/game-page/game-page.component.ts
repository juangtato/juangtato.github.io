import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardGamesService } from '../../service/board-games.service';
import { LoadingService } from '../../../../ui/layout/service/loading.service';
import { BoardGame } from '../../model/board-games.model';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  static readonly PARAM_ID = 'gameId';

  game?: BoardGame;

  constructor(
    private loadingService: LoadingService,
    private boargameService: BoardGamesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const gameId = this.activatedRoute.snapshot.paramMap.get(GamePageComponent.PARAM_ID);
    if (gameId) {
      this.loadGame(gameId);
    }
  }

  private loadGame(gameId: string): void {
    this.loadingService.start();
    this.boargameService.getGame(gameId).subscribe({
      next: d => {
        this.game = d;
        this.loadingService.stop();
      },
      error: e => {
        console.log('ERROR!', e);
        this.loadingService.stop();
        alert('Unable to get game');
      }
    })
  }

}
