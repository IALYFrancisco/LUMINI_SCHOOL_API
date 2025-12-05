import { Router } from "express";
import { AddArticle, GetArticle } from "../services/article.js";

export const articleRouter = Router()

articleRouter.get('/get', GetArticle)
articleRouter.post('/create', AddArticle)