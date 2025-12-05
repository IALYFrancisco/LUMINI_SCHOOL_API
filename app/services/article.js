import { Article } from "../models/Article.js"

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