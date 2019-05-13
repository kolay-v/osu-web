declare module 'osu-json' {
  export interface OSUMap {
    name: string;
  }

  export default class OSUJson {
    public static ParseOSUFileAsync(file: string): Promise<unknown>;
  }
}
