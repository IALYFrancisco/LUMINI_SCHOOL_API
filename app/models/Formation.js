import mongoose from "mongoose"

const formationSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    publishDate: { type: Date, default: null },
    description: { type: String, required: true, validate: {
        validator: function (value) {
            const wordCount = value.trim().split(/\s+/).length
            return wordCount >= 100 && wordCount <= 150
        },
        message: "The description must contains between 100 and 150 words."
    } },
    prerequisites: { type: [String], default: [] },
    published: { type: Boolean, required: true, default: false }
},{timestamps: true})

export const Formation = new mongoose.model('Formations', formationSchema)