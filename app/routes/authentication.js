import e from "express"
import { Login, Logout, Register } from "../services/authentication.js"

export const authentication_router = e.Router()

authentication_router.post('/register', Register)
authentication_router.post('/login', Login)
authentication_router.post('/logout', Logout)