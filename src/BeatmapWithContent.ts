import { Beatmap } from 'osu-bpdpc'

export default interface BeatmapWithContent extends Beatmap {
  audio: Blob
  bg: Blob | null
}
