import multer, { diskStorage } from "multer"
import { Article } from "../models/Article.js"
import sharp from "sharp"
import path from 'path'

export async function AddArticle(request, response) {
    try{
        if(!request.file) {
            let newArticle = new Article(request.body)
            newArticle.author = request.session.user._id
            let result = await newArticle.save()
            if(result){
                return response.status(201).end()
            }
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

        var { _id, title } = request.query

        if(_id || title) {
            if(_id){
                var article = await Article.findOne({ _id: _id })
            }
            if(title){
                var article = await Article.findOne({ title: title })
            }
            response.status(200).json(article)
        }else{
            if(request.session && request.session.user && (request.session.user.status === "admin" || request.session.user.status === "superuser")){
                let articles = await Article.find({})
                response.status(200).json(articles)
            }else{
                let articles = await Article.find({ published: true })
                response.status(200).json(articles)
            }
        }
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

export async function UpdateArticle(request, response){
    try{
        var { _id } = request.query
        if(!request.file){
            let article = await Article.findByIdAndUpdate(_id, request.body)
            let result = await article.save()
            if(result){
                response.status(200).end()
            }
        }else{
            let fileName = `${Date.now()}-${Math.random(Math.random()*1E9)}.jpeg`
            let article = await Article.findOne({ _id: id })
            article.image = `articles/posters/${fileName}`
            article.author = request.session.user._id
            let result = await article.save()
            if(result && request.body){
                let output = `./app/public/articles/posters/${fileName}`
                await sharp(request.file.buffer).jpeg({ quality: 60 }).toFile(output)
                let _article = await Article.findByIdAndUpdate(_id, request.body)
                let _result = await _article.save()
                if(_result){
                    response.status(200).end()
                }
            }
        }
    }
    catch(err){
        response.status(500).end()
    }
}

export async function DeleteArticle(request, response) {
    try{
        await Article.findByIdAndDelete({ _id: request.body._id })
        response.status(200).end()
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