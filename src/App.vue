<template>
  <div id="app">
    <MapList @newMap="onNewMap" />
    <Game v-bind:map="map"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import MapList from './components/MapList.vue'
import Game from './components/Game.vue'
import BeatmapWithContent from './BeatmapWithContent'
import { log } from './utils'

@Component({
  components: { MapList, Game }
})
export default class App extends Vue {
  @Provide('map') map: BeatmapWithContent | null = null

  private onNewMap (map: BeatmapWithContent[]) {
    log(map, this.onNewMap)
    this.map = map[0]
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
