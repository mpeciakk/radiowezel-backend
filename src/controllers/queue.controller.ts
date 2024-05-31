import { prisma } from "../db/prisma"
import { Song, VolumioSong } from "../types/song"

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export async function queueSong(song: Song) {
  prisma.scheduledSong.create({
    data: {
      ...song,
    },
  })
}

export async function acceptSong(id: number) {
  prisma.scheduledSong.update({
    where: {
      id: id,
    },
    data: {
      accepted: true,
    },
  })
}

export async function getUnacceptedSongs() {
  return await prisma.scheduledSong.findMany({
    where: {
      accepted: false,
    },
  })
}

export async function addSongsToMainQueue(songs: Song[]) {
  songs
    .filter((song) => song.service === "youtube")
    .forEach(async (song) => {
      const songExists =
        (await prisma.song.findFirst({
          where: {
            videoId: song.videoId,
          },
        })) !== null

      if (!songExists) {
        prisma.song.create({
          data: {
            ...song,
          },
        })
      }
    })
}

export async function getSongsByBreak(breakNumber: number) {
  const scheduledSongs = await prisma.scheduledSong.findMany({
    where: {
      accepted: true,
      break: breakNumber,
      played: false,
    },
    orderBy: [
      {
        priority: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  })

  const queue = await prisma.song.findMany({
    take: 10,
  })

  shuffleArray(queue)

  return (scheduledSongs as VolumioSong[]).concat(queue)
}
