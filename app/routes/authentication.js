import e from "express"
import { isAuthenticated, isNotAuthenticated, Login, Logout, Register } from "../services/authentication.js"

export const authentication_router = e.Router()

authentication_router.post('/register', isNotAuthenticated, Register)
authentication_router.post('/login', isNotAuthenticated, Login)
authentication_router.post('/logout', isAuthenticated, Logout)