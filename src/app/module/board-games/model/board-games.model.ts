export interface BoardGameLinks {
  [site: string]: string;
}

export interface BoardGame {
  id: string;

  name: string;
  imageUrl: string;
  links: BoardGameLinks;
  description?: string;
}

export interface Gameplay {
  id: string;
  gameId: string;

  date: string;
  duration: number;

  summary?: string;
}

export interface BoardGameIndex {
  [id: string]: BoardGame
}

export interface BoardGames {
  games: BoardGameIndex;
  gameplays: Array<Gameplay>;
}
