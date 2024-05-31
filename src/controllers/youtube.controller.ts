import YTMusic from "ytmusic-api"

const ytMusic = new YTMusic()
await ytMusic.initialize()

export async function getYoutubeSongs(query: string) {
  const songs = await ytMusic.searchSongs(query)

  return songs
}
