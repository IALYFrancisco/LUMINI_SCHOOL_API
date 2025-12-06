import multer, { diskStorage } from "multer"
import { Article } from "../models/Article.js"
import sharp from "sharp"
import path from 'path'

export async function AddArticle(request, response) {
    try{
        if(!request.file) {
            return response.status(400).end()
        }else{
            let fileName = `${Date.now()}-${Math.round(Math.random()*1E9)}.jpeg`
            let newArticle = new Article(request.body)
            newArticle.image = `articles/posters/${fileName}`
            newArticle.author = request.session.user._id
            let result = await newArticle.save()
            if(result){
                let output = `./app/public/articles/posters/${fileName}`
                await sharp(request.file.buffer).jpeg({ quality: 60 }).toFile(output)
                response.status(201).end()
            }
        }
    }catch(err){
        response.status(500).end()
    }
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

export async function ArticlePublication(request, response){
    try{
        let article = await Article.findByIdAndUpdate(request.body.articleId, request.body.update)
        if(article.published){
            article.publishedAt = null
        }else{
            article.publishedAt = Date.now()
        }
        await article.save()
        if(article){
            response.status(200).end()
        }
    }catch(err){
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
        response.status(500).end()
    }
}

export async function AddFile(request, response){
    try{
        let url = `/articles/files/${request.file.filename}`
        response.status(201).json({ url: url })
    }
    catch(err){
        response.status(500).end()
    }
}

const storageUploadedFile = diskStorage({
    destination: (request, file, callback) => callback(null, './app/public/articles/files'),
    filename: (request, file, callback) => callback(null , Date.now() + path.extname(file.originalname))
})

export const uploadFile = multer({ storage: storageUploadedFile })