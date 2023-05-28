import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardGamesComponent } from './board-games.component';
import { ParentPageComponent } from '../../ui/layout/parent-page/parent-page.component';
import { CreateGamePageComponent } from './page/create-game-page/create-game-page.component';
import { AddGameplayPageComponent } from './page/add-gameplay-page/add-gameplay-page.component';
import { GamePageComponent } from './page/game-page/game-page.component';

const routes: Routes = [
  {
     path: '',
     component: ParentPageComponent,
     children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path:'info',
        component: BoardGamesComponent
      },
      {
        path: 'add-game',
        component: CreateGamePageComponent
      },
      {
        path: 'new-gameplay',
        component: AddGameplayPageComponent
      },
      {
        path: 'game/:' + GamePageComponent.PARAM_ID,
        component: GamePageComponent
      }
     ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardGamesRoutingModule { }
