import Game from './game'
import parser from './parser'

const game = new Game()
fetch('easy.osu').then(r => r.text()).then(parser)

document.getElementById('btn').onclick = async () => {
  game.run()
}
