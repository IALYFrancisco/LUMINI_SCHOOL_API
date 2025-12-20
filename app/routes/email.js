import Router from 'express'
import { SendClientEmail } from '../services/email.js'

export const emailRouter = Router()

emailRouter.post('/send', SendClientEmail)