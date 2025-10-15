import e from "express"
import { Register } from "../services/authentication.js"

export const authentication_router = e.Router()

authentication_router.post('/register', Register)