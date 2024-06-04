import YTMusic from "ytmusic-api"
import { VolumioSong } from "../types/song"

const ytMusic = new YTMusic()
await ytMusic.initialize()

export async function getYoutubeSongs(query: string) {
  // const songs = await ytMusic.searchSongs(query)

  const songs = await fetch(
    `${process.env.VOLUMIO_URL}/search?query=${query}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.VOLUMIO_AUTH!).toString(
          "base64"
        )}`,
      },
    }
  )

  return ((await songs.json()) as any).navigation.lists.find((listing: any) =>
    listing.title.startsWith("YouTube results for")
  ).items
}
