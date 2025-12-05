import { Article } from "../models/Article.js"
import sharp from "sharp"

export async function AddArticle(request, response) {
    response.status(200).json(request.body)
}

export async function GetArticle(request, response) {
    try{
        let articles = await Article.find()
        response.status(200).json(articles)
    }
    catch(err){
        response.status(500).end()
    }
}

export async function AddIllustration(request, response) {
    try{
        if(!request.file) { return response.status(209).end() }
        else {
            let fileName = `${Date.now()}-${Math.round(Math.random()*1E9)}.jpeg`
            let url = `articles/illustrations/${fileName}`
            let output = `./app/public/articles/illustrations/${fileName}`
            await sharp(request.file.buffer).jpeg({ quality: 60 }).toFile(output)
            response.status(201).json({ url: url })
        }
    }catch(err){
        console.log(err)
        response.status(500).end()
    }
}