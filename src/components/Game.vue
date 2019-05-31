<template>
  <div>
    <span>{{ score }}</span>
    <canvas ref="game" class="game-canvas"></canvas>
    <p>game</p>
  </div>
</template>

<script lang="ts">
import * as PIXI from 'pixi.js-legacy'
import { Component, Vue, Prop, Watch, Provide } from 'vue-property-decorator'
import BeatmapWithContent from '../BeatmapWithContent'
import { blob2b64, log } from '../utils'
import { HitObject } from 'osu-bpdpc/src/Beatmap'
import { HitType, HitSound } from 'osu-bpdpc'
import { Howl } from 'howler'
import { win32 } from 'path'

@Component
export default class Game extends Vue {
  private app!: PIXI.Application
  @Prop() readonly map!: BeatmapWithContent | null
  @Provide('score') score: number = 0

  @Watch('map') onMapChange (n: BeatmapWithContent | null) {
    return this.start()
  }

  mounted () {
    this.app = new PIXI.Application({
      width: 384,
      height: 512,
      backgroundColor: 0x000000,
      view: this.$refs.game as HTMLCanvasElement,
      resizeTo: window
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
    if (map.bg !== null) {
      const bg = PIXI.Sprite.from(await blob2b64(map.bg))
      bg.x = 0
      bg.y = 0
      bg.width = app.screen.width
      bg.height = app.screen.height
      this.app.stage.addChild(bg)
    }
    const audio = await blob2b64(map.audio)
    const howl = new Howl({
      src: audio,
      autoplay: true,
      format: 'mp3'
    })
    howl.once('load', () => map.HitObjects.map(obj =>
      setTimeout(() => this.draw(obj), obj.startTime)
    ))
  }

  private draw (obj: HitObject) {
    if (obj.hitType & HitType.Normal) {
      console.log(obj)
      let radius = 20
      const startRadius = radius
      const container = new PIXI.Container()
      const objP = new PIXI.Graphics()
      objP.beginFill(0xffffff)
      objP.drawCircle(obj.pos.x + radius, obj.pos.y + startRadius, radius)
      objP.endFill()
      objP.interactive = true
      objP.buttonMode = true
      const onTick = (delta: number) => {
        radius -= 0.02 * delta
        helpP.clear()
        helpP.lineStyle(1, 0xffffff, 1)
        helpP.beginFill(0, 0)
        helpP.drawCircle(obj.pos.x + startRadius, obj.pos.y + startRadius, radius * 2)
        helpP.endFill()
        if (startRadius > radius * 2) {
          container.destroy()
          this.score--
          this.app.ticker.remove(onTick)
          log('end', this)
        }
      }
      objP.on('pointerdown', () => {
        container.destroy()
        this.score++
        this.app.ticker.remove(onTick)
      })
      const helpP = new PIXI.Graphics()
      helpP.lineStyle(1, 0xffffff, 1)
      helpP.beginFill(0, 0)
      helpP.drawCircle(obj.pos.x + startRadius, obj.pos.y + startRadius, radius * 2)
      helpP.endFill()
      container.addChild(objP)
      container.addChild(helpP)
      this.app.stage.addChild(container)
      this.app.ticker.add(onTick)
    }
  }
}
</script>

<style scoped>
.game {
  color: rgb(68, 68, 68);
}
</style>
