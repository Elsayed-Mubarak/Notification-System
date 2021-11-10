import express from "express"
const router = express.Router()
import { gameController } from "../controller/GameController"

router.get('/games/:userId', gameController.getAllGames)

export default router