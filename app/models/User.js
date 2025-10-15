import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required }
})

export const User = new model('Users', UserSchema)