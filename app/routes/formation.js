import Router from 'express'
import { AddFormation, GetFormation, upload } from '../services/formation.js'

export const formationRouter = Router()

formationRouter.post('/add', upload.single("poster"), AddFormation)
formationRouter.get('/get', GetFormation)