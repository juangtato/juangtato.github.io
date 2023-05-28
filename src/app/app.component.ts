import { Component } from '@angular/core';
import { ConfigService } from './config/service/config.service';
import { ConfigData } from './config/config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private configService: ConfigService
  ) {
    // TODO remove this
    console.log(this.configService.get('storage'));
    console.log(this.configService.get<ConfigData>(''));
  }
}
