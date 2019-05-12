import * as PIXI from 'pixi.js'

export default (app: PIXI.Application, onClick: () => void) => {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0x000, 1)
  graphics.drawCircle(100, 250, 50)
  graphics.endFill()
  graphics.interactive = true
  graphics.on('pointerdown', onClick)
  app.stage.addChild(graphics)
  // return graphics
}
