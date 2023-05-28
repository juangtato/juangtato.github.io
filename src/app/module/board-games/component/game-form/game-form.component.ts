import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardGamesService } from '../../service/board-games.service';
import { BoardGame } from '../../model/board-games.model';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent {
  private state?: BoardGame;
  private editableState: boolean = true;

  form = this.boardgamesService.gameForm();

  @Input()
  set data(value: BoardGame | undefined) {
    this.state = value;

    this.form.controls.links.reset();
    if (value) {
      this.form.setValue({
        id: value.id,
        name: value.name,
        description: value.description || '',
        imageUrl: value.imageUrl,
        links: {}
      });
      for (const [key, link] of Object.entries(value.links)) {
        this.form.controls.links.addControl(
          key,
          this.boardgamesService.gameLinkFormControl(link)
        );
      }
    } else {
      this.form.reset();
    }
  }

  @Input()
  set editable(value: boolean) {
    this.editableState = value;
    ((value)? this.form.enable : this.form.disable)();
  }

  get editable(): boolean {
    return this.editableState;
  }

  @Output()
  action = new EventEmitter<BoardGame | undefined>();

  constructor(
    private boardgamesService: BoardGamesService
  ) { }

  save(): void {
    // TODO validations and modals
    if (this.form.valid) {
      this.action.emit(this.form.getRawValue());
    }
  }

  cancel(): void {
    // TODO evaluate touched && modal
    this.action.emit(undefined);
  }
}
