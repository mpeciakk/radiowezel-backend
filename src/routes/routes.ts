import { Router, Request } from "express"
import { getYoutubeSongs } from "../controllers/youtube.controller"

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

  res.send({
    status: 200,
    data: await getYoutubeSongs(req.params.query),
  })
})

export default router
