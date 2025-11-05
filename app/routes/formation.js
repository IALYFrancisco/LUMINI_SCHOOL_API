import Router from 'express'
import { AddFormation, DeleteFormation, GetFormation, upload } from '../services/formation.js'

export const formationRouter = Router()

formationRouter.post('/add', upload.single("poster"), AddFormation)
formationRouter.get('/get', GetFormation)
formationRouter.delete('/delete', DeleteFormation)