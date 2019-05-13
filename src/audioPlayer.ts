export default class AudioPlayer {
  private state = false;
  private audio: HTMLAudioElement;
  public song: string;

  public constructor(song: string) {
    this.song = song;
    this.audio = new Audio(song);
  }

  public inverse = async (): Promise<void | undefined> => {
    if (this.state) {
      this.audio.pause();
    } else {
      try {
        await this.audio.play();
      } catch (e) {
        alert(e);
        return undefined;
      }
    }
    this.state = !this.state;
  };
}
