import e from "express"
import { authentication_router } from "./authentication.js"

export const app_routes = e.Router()

app_routes.use('/authentication', authentication_router)