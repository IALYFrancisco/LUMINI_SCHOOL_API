import Router from 'express'
import { isAuthenticated } from '../services/authentication.js'
import { ChangePassword, ChangeUserStatus, DeleteAccount, GetUser, GetUserInformations, isSuperuser, UpdateUser } from '../services/user.js'
import { upload } from '../services/formation.js'

export const userRouter = Router()

userRouter.get('/informations', isAuthenticated, GetUserInformations)
userRouter.get('/get', isSuperuser, GetUser)
userRouter.patch('/change-status', isSuperuser, ChangeUserStatus)
userRouter.patch('/change-password', isAuthenticated, ChangePassword)
userRouter.patch('/update', isAuthenticated, upload.single('profile'),UpdateUser)
userRouter.delete('/delete', isAuthenticated, DeleteAccount)