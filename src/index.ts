import * as PIXI from 'pixi.js'
import render from './render'

const app = new PIXI.Application()

document.body.appendChild(app.view)

app.renderer.backgroundColor = 0xffffff

render(app, 1)
// render(app, 2)
// render(app, 3)
