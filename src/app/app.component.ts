import { Component } from '@angular/core';
import { ConfigService } from './config/service/config.service';
import { ConfigData } from './config/config.model';
import { PantryStorageService } from './storage/pantry/pantry-storage.service';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private configService: ConfigService,
    private pantryService: PantryStorageService,
    private iconRegistry: MatIconRegistry
  ) {
    // TODO remove this
    console.log(this.configService.get('storage'));
    console.log(this.configService.get<ConfigData>(''));


    console.log(this.iconRegistry.getDefaultFontSetClass())
    console.log(this.iconRegistry)
  }
}
