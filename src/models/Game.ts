import mongoose, { model, Schema } from "mongoose";


const GameSchema: Schema = new Schema({
    users: [
        {
            name: { type: String },
            status: { type: String },
            type: { type: String }
        }
    ],
    usersIds: [String],
    scoreLimit: { type: Number }
})

export default model('Game', GameSchema)