import { Document, Schema, Model, model } from "mongoose"

export interface IUser extends Document {
    userId: String;
    username: String;
    email: String;
}

export const userSchema: Schema = new Schema({
    userId: {
        type: String, required: true,
        unique: true
    },
    username: String,
    email: String
})

export const User: Model<IUser> = model<IUser>("Users", userSchema)