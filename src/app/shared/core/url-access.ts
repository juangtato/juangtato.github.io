export class UrlAccess {
  static url(...parts: Array<string>): string {
    let result = '';
    for (const part of parts) {
      result += (!result || /\/$/.test(result)) ? part : `/${part}`;
    }
    return result;
  }
}
