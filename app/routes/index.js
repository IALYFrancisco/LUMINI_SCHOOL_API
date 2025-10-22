import e from "express"
import { authentication_router } from "./authentication.js"
import { formationRouter } from "./formation.js"

export const app_routes = e.Router()

app_routes.use('/authentication', authentication_router)
app_routes.use('/formation', formationRouter)