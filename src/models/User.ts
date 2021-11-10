import { model, Schema, Document } from 'mongoose'
import { languageEnum } from './enums/Language';

export interface IUser extends Document {
    name: String,
    phone: String,
    email: String,
    lang?: languageEnum
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        lang: {
            type: String,
            enum: Object.values(languageEnum),
            default: languageEnum.en, required: true
        },
    },
    { timestamps: true })

export default model<IUser>('User', UserSchema);