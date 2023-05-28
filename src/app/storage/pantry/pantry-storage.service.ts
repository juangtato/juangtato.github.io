import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/service/config.service';
import { PantryConfig } from './pantry.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
      UrlAccess.url(this.baseUrl(), 'basket', basketName)
    );
  }

  private baseUrl(): string {
    const config = this.configService.get<PantryConfig>(PantryStorageService.PANTRY_CONFIG);
    if (config){
      return UrlAccess.url(config.url, config.pantryId);
    } else {
      throw Error('There is no Pantry configuration');
    }
  }

}
