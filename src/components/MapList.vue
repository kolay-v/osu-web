<template>
  <div class="hello">
    <button id="play" @click="onPlay">Play</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { loadMap } from '../utils'

@Component
export default class MapList extends Vue {
  private async onPlay () {
    const levels = await loadMap('/song.osz', () => null)
    this.$emit('newMap', levels)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#play {
  color: red;
}
</style>
