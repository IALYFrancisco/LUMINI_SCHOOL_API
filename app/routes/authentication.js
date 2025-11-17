import e from "express"
import { forNotAuthenticatedOnly, isAuthenticated, Login, Logout, Register } from "../services/authentication.js"

export const authentication_router = e.Router()

authentication_router.post('/register', forNotAuthenticatedOnly, Register)
authentication_router.post('/login', forNotAuthenticatedOnly, Login)
authentication_router.post('/logout', isAuthenticated, Logout)