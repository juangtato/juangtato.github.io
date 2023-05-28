import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigData } from './config.model';
import { ConfigManagerService } from './service/config-manager.service';
import { ConfigService } from './service/config.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ]
})
export class ConfigModule {
  static forRoot(
    configList: Array<ConfigData> = []
  ): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: ConfigManagerService
        }
      ]
    }
  }
}
