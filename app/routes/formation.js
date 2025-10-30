import Router from 'express'
import { AddFormation, upload } from '../services/formation.js'

export const formationRouter = Router()

formationRouter.post('/add', upload.single("poster"), AddFormation)