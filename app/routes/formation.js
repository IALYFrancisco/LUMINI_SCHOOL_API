import Router from 'express'
import { AddFormation, DeleteFormation, GetFormation, FormationPublication, upload } from '../services/formation.js'
import { isAdminOrSuperuser } from '../services/user.js'

export const formationRouter = Router()

formationRouter.post('/add', isAdminOrSuperuser, upload.single("poster"), AddFormation)
formationRouter.get('/get', GetFormation)
formationRouter.patch('/update', isAdminOrSuperuser, FormationPublication)
formationRouter.delete('/delete', isAdminOrSuperuser, DeleteFormation)