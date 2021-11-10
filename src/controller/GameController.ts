import { Response, Request } from "express";
import GameService from "../services/GameService";

class GameController {

    private gameService: GameService
    constructor() {
        this.gameService = new GameService();
    }

    getAllGames = async (req: Request, res: Response) => {
        try {
            let { userId } = req.params;
            let games = await this.gameService.findAllGames(userId);

            return res.status(200).send({
                code: 200,
                data: games,
            })

        } catch (e) {
            return res.status(500).send({
                code: 500,
                err: e,
                message: 'An error occurred while finding games.'
            })
        }
    }

}

export const gameController = new GameController();