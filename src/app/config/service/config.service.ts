export abstract class ConfigService {

  abstract get<T>(path: string): T;
  abstract get<T>(path: string, defaultValue: T): T;

  abstract find<T>(path: string): T | undefined;

}
