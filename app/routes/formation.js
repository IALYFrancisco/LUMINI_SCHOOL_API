import Router from 'express'
import { AddFormation, DeleteFormation, GetFormation, upload } from '../services/formation.js'
import { isAdmin } from '../services/user.js'
import { isAuthenticated } from '../services/authentication.js'

export const formationRouter = Router()

formationRouter.post('/add', isAuthenticated, upload.single("poster"), AddFormation)
formationRouter.get('/get', GetFormation)
formationRouter.delete('/delete', isAdmin, DeleteFormation)