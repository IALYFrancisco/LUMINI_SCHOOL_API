import mongoose from "mongoose"

const formationSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    publisheDate: { type: Date, default: null },
    description: { type: String, required: true },
    prerequis: { type: [String], default: [] },
    published: { type: Boolean, required: true, default: false }
},{timestamps: true})

export const Formation = new mongoose.model('Formations', formationSchema)