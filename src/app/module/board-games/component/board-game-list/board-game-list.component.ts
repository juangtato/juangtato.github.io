import { Component, Input } from '@angular/core';
import { BoardGame } from '../../model/board-games.model';

@Component({
  selector: 'app-board-game-list',
  templateUrl: './board-game-list.component.html',
  styleUrls: ['./board-game-list.component.scss']
})
export class BoardGameListComponent {

  @Input()
  gameList: Array<BoardGame> = [];

  displayedColumns = ['image', 'name', 'description', 'id'];

}
