import { model, Schema } from "mongoose";
import slugify from "slugify"

const articleSchema = new Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    contents: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    publishedAt: { type: Date, default: null },
    author: { type: Schema.Types.ObjectId, required: true },
    image: { type: String, required: true }
}, { timestamps: true })

articleSchema.pre("save", function (next) {
    if(this.isModified("title")){
        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
            locale: "fr"
        })
    }
    next()
})

export const Article = new model('Article', articleSchema)