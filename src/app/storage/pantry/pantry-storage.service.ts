import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/service/config.service';
import { PantryConfig } from './pantry.config';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UrlAccess } from '../../shared/core/url-access';


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
      this.backetUrl(basketName)
    );
  }

  post<T>(basketName: string, data: T): Observable<T> {
    return this.http.post<T>(
      this.backetUrl(basketName),
      data
    );
  }

  /**
   * This operation performs a deep merge and will overwrite the values of any existing keys, or append values to nested objects or arrays.
   * @param basketName basketName
   * @param data Partial<Data>
   * @returns
   */
  put<T>(basketName: string, data: Partial<T>): Observable<T> {
    // This operation performs a deep merge and will overwrite the values of any existing keys,
    // or append values to nested objects or arrays.
    return this.http.put<T>(
      this.backetUrl(basketName),
      data
    );
  }

  delete(basketName: string): Observable<boolean> {
    return this.http.delete<string>(
      this.backetUrl(basketName)
    ).pipe(map(v => true));
  }

  private backetUrl(basketName: string): string {
    const config = this.configService.get<PantryConfig>(PantryStorageService.PANTRY_CONFIG);
    if (config) {
      return UrlAccess.url(config.url, config.pantryId, 'basket', basketName);
    } else {
      throw Error('There is no Pantry configuration');
    }
  }

  private baseUrl(): string { // TODO remove?
    const config = this.configService.get<PantryConfig>(PantryStorageService.PANTRY_CONFIG);
    if (config) {
      return UrlAccess.url(config.url, config.pantryId);
    } else {
      throw Error('There is no Pantry configuration');
    }
  }

}
