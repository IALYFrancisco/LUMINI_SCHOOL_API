import { model, Schema } from "mongoose"

const registrationSchema = new Schema({
    formation_id: { type: Schema.Types.ObjectId, ref: "Formation", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    registrationDate: { type: Date, required: true, default: Date.now() }
})

export const Registration = new model('Registrations', registrationSchema)