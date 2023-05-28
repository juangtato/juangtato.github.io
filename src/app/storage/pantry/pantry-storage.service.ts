import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/service/config.service';
import { PantryConfig } from './pantry.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PantryStorageService {

  private static readonly PANTRY_CONFIG = 'storage.pantry';

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  get<T>(basketName: string): Observable<T> {
    return this.http.get<T>(
      this.url(this.baseUrl(), basketName)
    );
  }

  private baseUrl(): string {
    const config = this.configService.get<PantryConfig>(PantryStorageService.PANTRY_CONFIG);
    if (config){
      return this.url(config.url, config.pantryId);
    } else {
      throw Error('There is no Pantry configuration');
    }
  }

  private url(...parts: Array<string>): string {
    let result = '';
    for (const part of parts) {
      result += (/\/$/.test(part)) ? part : `/${part}`;
    }
    return result;
  }
}
