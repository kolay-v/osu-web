declare module 'osu-json' {
  export interface OSUMap {
    name: string;
  }

  export default class OSUJson {
    static ParseOSUFileAsync(file: string): Promise<unknown>;
  }
}

