import { model, Schema } from "mongoose";

const articleSchema = new Schema({
    title: { type: String, required: true },
    contents: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    publishedAt: { type: Date, default: null },
    author: { type: Schema.Types.ObjectId, required: true },
    image: { type: String, required: true }
}, { timestamps: true })

export const Article = new model('Article', articleSchema)