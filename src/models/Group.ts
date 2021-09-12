import { model, Schema, Document } from 'mongoose'

export interface IGroup extends Document {
    name: String,
    phone: String,
    email: String
}

const GroupSchema: Schema = new Schema(
    {
        name: { type: String }
    },
    { timestamps: true })

export default model<IGroup>('Group', GroupSchema);