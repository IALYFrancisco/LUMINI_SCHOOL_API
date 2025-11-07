import Router from 'express'
import { isAuthenticated } from '../services/authentication.js'
import { AddFormation, DeleteFormation, GetFormation, upload } from '../services/formation.js'

export const formationRouter = Router()

formationRouter.post('/add', isAuthenticated, upload.single("poster"), AddFormation)
formationRouter.get('/get', GetFormation)
formationRouter.delete('/delete', isAuthenticated, DeleteFormation)