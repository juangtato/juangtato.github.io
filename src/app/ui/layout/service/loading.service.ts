import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private counter: number = 0;
  private resolver?: (value: boolean | PromiseLike<boolean>) => void;
  private promise?: Promise<boolean>;

  constructor() { }

  start(): Promise<boolean> {
    if (!this.promise) {
      // TODO launch loading screen
      console.log('TODO launch loading screen');
      this.promise = new Promise<boolean>((resolve) => this.resolver = resolve);
      this.counter = 1;
    } else {
      this.counter ++;
      console.log(`Loading screen, ${this.counter} items waiting`);
    }
    return this.promise;
  }

  stop(): void {
    this.counter--;
    if (this.counter <= 0 && this.resolver) {
      timer(200).subscribe(
        () => this.check()
      );
    }
  }

  private check(): void {
    if (this.counter <= 0 && this.resolver) {
      // TODO close loading screen
      console.log('TODO close loading screen');

      this.resolver(true);
      this.counter = 0;

      this.resolver = undefined;
      this.promise = undefined;
    }
  }
}
