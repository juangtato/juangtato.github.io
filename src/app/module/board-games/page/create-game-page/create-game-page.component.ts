import { Component } from '@angular/core';
import { LoadingService } from '../../../../ui/layout/service/loading.service';
import { BoardGamesService } from '../../service/board-games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardGame } from '../../model/board-games.model';

@Component({
  selector: 'app-create-game-page',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.scss']
})
export class CreateGamePageComponent {

  constructor(
    private loadingService: LoadingService,
    private boargameService: BoardGamesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  formAction(data: BoardGame | undefined): void {
    if (data) {
      this.loadingService.start();
      this.boargameService.createGame(data).subscribe({
        next: d => {
          this.loadingService.stop();
          // TODO toast with success
          this.goToList();
        },
        error: e => {
          console.log('ERROR', e);
          // TODO toast with error
          this.loadingService.stop();
        }
      });

    } else {
    this.goToList();
    }
  }

  private goToList(): void {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
