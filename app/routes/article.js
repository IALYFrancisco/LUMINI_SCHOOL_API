import { Router } from "express";
import { AddArticle } from "../services/article.js";

export const articleRouter = Router()

articleRouter.post('/create', AddArticle)