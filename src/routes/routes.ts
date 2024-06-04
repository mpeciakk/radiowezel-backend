import { Router, Request } from "express"
import { getYoutubeSongs } from "../controllers/youtube.controller"
import { Song } from "../types/song"
import { acceptSong, getSongsByBreak, getUnacceptedSongs, queueSong } from "../controllers/queue.controller"

const router = Router()

router.get("/", (req, res) => {
  res.send({
    status: 200,
  })
})

router.get("/search/:query", async (req: Request<{ query: string }>, res) => {
  if (!req.params.query)
    res.send({
      status: 400,
    })
  
  const songs = (await getYoutubeSongs(req.params.query))

  res.send({
    status: 200,
    data: songs,
  })
})

router.post("/queue/", async (req: Request<{}, {}, Song>, res) => {
  queueSong(req.body)

  res.send({
    status: 200
  })
})

router.post("/accept/", async (req: Request<{}, {}, { id: number }>, res) => {
  acceptSong(req.body.id)

  res.send({
    status: 200
  })
})

router.get("/unaccepted", async (req, res) => {
  res.send({
    status: 200,
    data: await getUnacceptedSongs()
  })
})

router.get("/songs/:break", async (req: Request<{ break: string }>, res) => {
  res.send({
    status: 200,
    data: await getSongsByBreak(parseInt(req.params.break))
  })
})

export default router
