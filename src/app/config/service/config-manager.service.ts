import { Inject, Injectable, Optional } from '@angular/core';
import { merge } from 'lodash-es';
import { ConfigService } from './config.service';
import { CONFIG_DATA, ConfigData, DEFAULT_CONFIG } from '../config.model';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
/*
TODO come back => https://medium.com/mizyind-singularity/remove-blank-attributes-from-an-object-in-typescript-with-type-safe-ad4fd78a061c
type Valuable<T> = { [K in keyof T as T[K] extends null | undefined ? never : K]: T[K] };

function hasValue(v: any): boolean {
  return !(v === undefined || v === null || (typeof v === 'string' && v === ''));
}

function getValuable<T extends {}, V = Valuable<T>>(value: T): V {
  return Object.fromEntries(
    Object.entries(value).filter(
      ([, v]) => hasValue(v)
    ) as V;
  )
}
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigManagerService extends ConfigService {
  private readonly storageKey: string = 'persistedConfig';

  private configList: Array<Partial<ConfigData>>;
  private config: ConfigData;

  constructor(
    @Optional()
    @Inject(CONFIG_DATA)
    configList: Array<Partial<ConfigData>> | null,
    private nfb: NonNullableFormBuilder
  ) {
    super();
    this.configList = configList || [];
    this.config = this.reloadConfig();
  }

  override get<T>(path: string): T;
  override get<T>(path: string, defaultValue: T): T;
  get<T>(path: string, defaultValue?: T): T {
    const current = this.find<T>(path);

    if (current === undefined && defaultValue === undefined) {
      throw Error(`There is no configuration for ${path}`);
    }

    return (current || defaultValue) as T;
  }

  override find<T>(path: string): T | undefined {
    // TODO this is actually real tricky
    let current = this.config as any;
    for (const p of path.split('.')) {
      if (p) {
        if (current && (p in current)) {
          current = current[p];
        } else {
          current = undefined;
          break;
        }
      }
    }
    return current;
  }

  form() {
    const config = this.getPersisted();
    // TODO load persisted configuration
    return this.nfb.group({
      storage: this.nfb.group({
        pantry: this.nfb.group({
          pantryId: this.nfb.control(
            config.storage?.pantry.pantryId || '',
            [Validators.required]
          )/* , TODO => fix valuable
          url: this.nfb.control(
            config.storage?.pantry.url || '',
            [Validators.required]
          ), */
        })
      })
    });
  }

  save(config: Partial<ConfigData>): void {
    localStorage.setItem(
      this.storageKey,
      this.serialize(config)
    );
  }

  getPersisted(): Partial<ConfigData> {
    return this.retrieveConfig();
  }

  private reloadConfig(): ConfigData {
    let result = this.defaultConfig();
    for (const config of this.configList) {
      // TODO improve
      result = merge(result, config);
    }
    return merge(result, this.retrieveConfig());
  }

  private defaultConfig(): ConfigData {
    // TODO this should be in another place
    return DEFAULT_CONFIG;
  }

  private retrieveConfig(): any {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? this.deserialize(stored) : {};
  }

  private serialize(config: Partial<ConfigData>): string {
    return JSON.stringify(config);
  }

  private deserialize(value: string): Partial<ConfigData> {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}
