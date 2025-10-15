import e from "express"
import { authentication_router } from "./app/routes/authentication.js"

const app = e()

app.use('/authentication', authentication_router)

app.listen(3000, ()=>{ console.log("Server runnning at 3000") })