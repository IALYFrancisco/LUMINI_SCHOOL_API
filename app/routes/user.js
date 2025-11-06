import Router from 'express'
import { isAuthenticated } from '../services/authentication'
import { GetUserInformations } from '../services/user'

export const userRouter = Router()

userRouter.get('/informations', isAuthenticated, GetUserInformations)