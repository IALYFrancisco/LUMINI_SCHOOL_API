import e from "express"
import { authentication_router } from "./authentication.js"
import { formationRouter } from "./formation.js"
import { userRouter } from "./user.js"

export const app_routes = e.Router()

app_routes.use('/authentication', authentication_router)
app_routes.use('/formation', formationRouter)
app_routes.use('/user', userRouter)