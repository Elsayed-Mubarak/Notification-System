import Game from '../models/Game'

export default class GameService {
    async findAllGames(userId) {
        const pipeline = [
            {
                $match: {
                    usersIds: {
                        $in: [userId] //  $in: [userId] === $eq: userId
                    }
                }
            }
        ]
        let existingUser: any = await Game.aggregate(pipeline);

        if (!existingUser)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "User_Not_Exsist" }
        return existingUser;
    }
}