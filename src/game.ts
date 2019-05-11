import * as PIXI from 'pixi.js'

export default class Game {
  private app: PIXI.Application

  public constructor () {
    this.app = new PIXI.Application()
    this.app.renderer.backgroundColor = 0xffffff
    document.getElementById('game').appendChild(this.app.view)
  }

  public run = () => {
    // this.app.renderer.backgroundColor -= 0xff
  }
}
