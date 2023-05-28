import { Component } from '@angular/core';
import { ConfigService } from './config/service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private configService: ConfigService
  ) {
    console.log(this.configService.get('storage'));
    console.log(this.configService.get<any>(''));
  }
}
