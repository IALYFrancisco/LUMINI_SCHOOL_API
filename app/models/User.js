import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    profile: { type: String, required: true, default: "" },
    status: { type: String, required: true, default: "user" },
    password: { type: String, required: true },
    registerDate: { type: Date, required: true, default: Date.now() },
    phoneNumber: { type: String, default: null },
})

export const User = new model('Users', UserSchema)