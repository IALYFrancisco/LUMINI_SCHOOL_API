import { Router } from "express";
import { AddArticle, AddFile, AddIllustration, GetArticle, uploadFile } from "../services/article.js";
import { isAdminOrSuperuser } from "../services/user.js";
import { upload } from "../services/formation.js";

export const articleRouter = Router()

articleRouter.get('/get', GetArticle)
articleRouter.post('/create', isAdminOrSuperuser, AddArticle)
articleRouter.post('/add-illustration', isAdminOrSuperuser, upload.single("image"), AddIllustration)
articleRouter.post('/add-file', isAdminOrSuperuser, uploadFile.single("file"), AddFile)