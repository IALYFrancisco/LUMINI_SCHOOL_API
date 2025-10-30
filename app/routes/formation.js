import Router from 'express'
import { AddFormation } from '../services/formation.js'

export const formationRouter = Router()

formationRouter.post('/add', AddFormation)