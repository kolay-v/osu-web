import jszip from 'jszip'
import axios from 'axios'
import { Beatmap } from 'osu-bpdpc'
import BeatmapWithContent from './BeatmapWithContent'

export const blob2b64 = (blob: Blob): Promise<string> => new Promise((resolve) => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = () => {
    resolve(<string>reader.result)
  }
})

export const loadMap = (url: string, onProgress: (progress: number,
   type: 'zip' | 'file') => void) =>
  axios({
    url,
    responseType: 'blob',
    onDownloadProgress: (p) =>
      onProgress(Math.floor(p * 100), 'file')
  })
    .then(({ data }) => data as Blob)
    .then(jszip.loadAsync)
    .then(async zip => {
      const levels = await Promise.all(
        zip.file(/\.osu$/)
          .map(file => file.async('text')))
        .then(maps =>
          maps.map(Beatmap.fromOsu))
      return levels.map(async level => {
        const bgFile = zip.file(level.Events.Background)
        const bg = bgFile ? await bgFile.async('blob') : null
        return {
          ...level,
          audio: await zip.file(level.General.AudioFilename).async('blob'),
          bg
        } as unknown as BeatmapWithContent
      })
    }).then(l => Promise.all(l))

export const log = (msg: Object | any, from: { constructor: { name: string } } | Function) =>
  console.info(Object.assign(Object.is(msg, Object) ? msg : { msg },
    { this: from,
      name: (typeof from === 'function'
        ? from : from.constructor).name }
  ))
