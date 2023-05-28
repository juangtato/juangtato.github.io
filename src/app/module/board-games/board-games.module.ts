import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardGamesRoutingModule } from './board-games-routing.module';
import { BoardGamesComponent } from './board-games.component';
import { MatTableModule } from '@angular/material/table';
import { BoardGameListComponent } from './component/board-game-list/board-game-list.component';
import { ParentPageComponent } from '../../ui/layout/parent-page/parent-page.component';
import { CreateGamePageComponent } from './page/create-game-page/create-game-page.component';
import { AddGameplayPageComponent } from './page/add-gameplay-page/add-gameplay-page.component';
import { GameFormComponent } from './component/game-form/game-form.component';
import { GamePageComponent } from './page/game-page/game-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BoardGamesComponent,
    BoardGameListComponent,
    CreateGamePageComponent,
    AddGameplayPageComponent,
    GameFormComponent,
    GamePageComponent
  ],
  imports: [
    CommonModule,
    BoardGamesRoutingModule,
    ReactiveFormsModule,
    ParentPageComponent,

    MatTableModule
  ]
})
export class BoardGamesModule { }
