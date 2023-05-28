import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../config/service/config.service';
import { SideNavConfig } from '../../config/side-nav.config.api';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  private static readonly SIDE_NAVE_CONFIG = 'layout.sidenav';

  @Input() isExpanded!: boolean;

  config: SideNavConfig;

  constructor(
    private configService: ConfigService
  ) {
    this.config = this.configService.get<SideNavConfig>(SideNavComponent.SIDE_NAVE_CONFIG);
  }
}
