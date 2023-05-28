import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigManagerService } from '../../service/config-manager.service';
import { Router } from '@angular/router';
import { ConfigData } from '../../config.model';

@Component({
  selector: 'app-config-edition-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './config-edition-page.component.html',
  styleUrls: ['./config-edition-page.component.scss']
})
export class ConfigEditionPageComponent {

  form = this.configManagerService.form();

  constructor(
    private router: Router,
    private configManagerService: ConfigManagerService
  ) { }

  save(): void {
    const config = this.form.value;

    // TODO come back, remove assertion
    // FIXME
    this.configManagerService.save(config as Partial<ConfigData>);
    this.router.navigateByUrl('/');
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

}
