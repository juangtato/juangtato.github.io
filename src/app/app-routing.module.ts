import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing'
  },
  {
    path: 'landing',
    loadChildren: () => import('./module/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'example',
    loadChildren: () => import('./module/example/example.module').then(m => m.ExampleModule)
  },
  {
    path: 'config',
    loadComponent: () => import('./config/page/config-edition-page/config-edition-page.component').then(c => c.ConfigEditionPageComponent)
  },
  {
    path: 'board-games',
    loadChildren: () => import('./module/board-games/board-games.module').then(m => m.BoardGamesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
