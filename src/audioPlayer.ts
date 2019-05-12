export default class AudioPlayer {
  #state = false

  constructor (song: string) {
    this.song = song
    this.#audio = new Audio(song)
  }

  public inverse = async () => {
    if (this.#state) {
        this.#audio.pause()
    } else {
      try {
        await this.#audio.play()
      } catch (e) {
        alert(e)
        return undefined
      }
    }
      this.#state = !this.#state
    
  }
}