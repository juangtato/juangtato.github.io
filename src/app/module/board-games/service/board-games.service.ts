import { Injectable } from '@angular/core';
import { PantryStorageService } from '../../../storage/pantry/pantry-storage.service';
import { Observable, catchError, concatMap, defaultIfEmpty, map, of, tap } from 'rxjs';
import { BoardGame, BoardGameIndex, BoardGames } from '../model/board-games.model';
import { FormControl, FormRecord, NonNullableFormBuilder, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BoardGamesService {

  private static readonly BASKET_NAME = 'board-games';
  private cache?: BoardGames;

  constructor(
    private storageService: PantryStorageService,
    private nfb: NonNullableFormBuilder
  ) { }


  get(): Observable<BoardGames> {
    return of(this.cache).pipe(
      concatMap(v => v ? of(v) : this.fetch())
    );
  }

  fetch(): Observable<BoardGames> {
    return this.storageService.get<BoardGames>(BoardGamesService.BASKET_NAME).pipe(
      catchError(e => {
        if (e.status == 400) {
          return this.storageService.post<BoardGames>(BoardGamesService.BASKET_NAME, {
            gameplays: [],
            games: {}
          });
        }
        throw e;
      }),
      map(bgs => {
        bgs.gameplays = bgs.gameplays.sort((a, b) => a.date.localeCompare(b.date));
        return bgs;
      }),
      tap(
        d => this.cache = d
      )
    );
  }

  update(data: Partial<BoardGames>): Observable<BoardGames> {
    return this.storageService.put<BoardGames>(
      BoardGamesService.BASKET_NAME,
      data
    ).pipe(tap(d => this.cache = d));
  }

  gameForm() {
    return this.nfb.group({
      id: [uuid(), [Validators.required]],
      name: ['Legendary Encounters: An Alien Deck Building Game', [Validators.required]],
      imageUrl: 'https://cf.geekdo-images.com/jSz_KRUxsjGYitoqx9YH1Q__itemrep/img/ZMljy9r4vIEOH4mt8KIvO6aZqYw=/fit-in/246x300/filters:strip_icc()/pic2225180.jpg',
      links: new FormRecord<FormControl<string>>({}),
      description: ['']
    });
  }

  gameLinkFormControl(value: string = '') {
    return this.nfb.control(value, { validators: [Validators.required] });
  }

  createGame(game: BoardGame): Observable<BoardGame> {
    const data: BoardGameIndex = {};
    data[game.id] = game;

    return this.storageService.put<BoardGames>(
      BoardGamesService.BASKET_NAME,
      {
        games: data
      }
    ).pipe(
      tap(d => this.cache = d),
      map(d => d.games[game.id])
    );
  }

  getGame(gameId: string): Observable<BoardGame> {
    return this.get().pipe(
      map(d => {
        const result = d.games[gameId];
        if (!result) {
          throw { status: 400 }
        }
        return result;
      })
    );
  }
}
