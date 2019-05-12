import Beatmap from './beatmap'

const isMeaningLine = (line: string) => line.length > 1 && !line.startsWith('//')

export default (map: string) => {
  map.split('\n').filter(isMeaningLine).map(line => {
    line = line.trim()
    return line
  })
  return new Beatmap()
}
