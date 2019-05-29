<template>
  <div>
    <canvas ref="game" height="512" width="512"></canvas>
    <p>game</p>
  </div>
</template>

<script lang="ts">
import * as PIXI from 'pixi.js-legacy'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import BeatmapWithContent from '../BeatmapWithContent'
import { blob2b64, log } from '../utils'

@Component
export default class Game extends Vue {
  private app!: PIXI.Application
  @Prop() readonly map!: BeatmapWithContent | null

  @Watch('map') onMapChange (n: BeatmapWithContent | null) {
    return this.start()
  }

  mounted () {
    this.app = new PIXI.Application({
      width: 512,
      height: 512,
      backgroundColor: 0x000000,
      view: this.$refs.game as HTMLCanvasElement
    })
    if (process.env.NODE_ENV === 'production' &&
     this.app.renderer.type === PIXI.RENDERER_TYPE.CANVAS) {
      alert('Please update your browser for better perfomance')
    }
    return this.start()
  }

  private async start () {
    const { map, app } = this
    if (map === null) return
    //    <BeatmapWithContent>map
    if (map.bg !== null) {
      const bg = PIXI.Sprite.from(await blob2b64(map.bg))
      bg.x = 0
      bg.y = 0
      bg.width = app.screen.width
      bg.height = app.screen.height
      this.app.stage.addChild(bg)
    }
    log(map.HitObjects, this)
  }
}
</script>
