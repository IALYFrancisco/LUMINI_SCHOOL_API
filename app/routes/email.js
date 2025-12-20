import Router from 'express'
import { SendClientEmail } from '../services/email.js'
import { isAuthenticated } from '../services/authentication.js'

export const emailRouter = Router()

emailRouter.post('/send', SendClientEmail)