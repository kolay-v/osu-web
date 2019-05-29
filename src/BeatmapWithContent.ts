import { Beatmap } from 'osu-bpdpc'

export default interface BeatmapWithContent extends Beatmap {
  auido: Blob
  bg: Blob | null
}
