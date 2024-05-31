export type VolumioSong = {
  videoId: string
  uri: string
  service: string
  albumart: string
  artist: string
  album: string
  name: string
  title: string
  duration: number
}

export type Song = VolumioSong & {
  break: number
  priority: number
  accepted: boolean
}
