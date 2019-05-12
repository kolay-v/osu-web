import * as PIXI from 'pixi.js'
import AudioPlayer from './audioPlayer'

export default class Game {
  private app: PIXI.Application
  private player = new AudioPlayer('audio.mp3')

  public constructor () {
    this.app = new PIXI.Application()
    this.app.renderer.backgroundColor = 0xffffff
    document.getElementById('game').appendChild(this.app.view)
  }

  public run = () => {
    this.player.inverse()
    // this.app.renderer.backgroundColor -= 0xff
  }
}
