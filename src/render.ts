import * as PIXI from 'pixi.js'

export default (app: PIXI.Application, b: number) => {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0x000, 1)
  graphics.drawCircle(100, 250, 50)
  graphics.endFill()
  graphics.interactive = true
  graphics.on('pointerdown', () => alert(b))
  app.stage.addChild(graphics)
  // return graphics
}
