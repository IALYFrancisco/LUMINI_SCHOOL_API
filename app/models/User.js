import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true, default: "user" },
    password: { type: String, required: true },
    registerDate: { type: Date, required: true, default: Date.now() },
    phoneNumber: { type: String, required: true, default: null },
})

export const User = new model('Users', UserSchema)