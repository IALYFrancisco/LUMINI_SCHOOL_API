import Router from 'express'
import { isAuthenticated } from '../services/authentication.js'
import { ChangeUserStatus, DeleteAccount, GetUser, GetUserInformations, isSuperuser } from '../services/user.js'

export const userRouter = Router()

userRouter.get('/informations', isAuthenticated, GetUserInformations)
userRouter.get('/get', isSuperuser, GetUser)
userRouter.patch('/change-status', isSuperuser, ChangeUserStatus)
userRouter.delete('/delete', isAuthenticated, DeleteAccount)