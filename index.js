import e from "express"
import { app_routes } from "./app/routes/index.js"
import { config } from "dotenv"
import { DbConnection } from "./app/services/db_connection.js"

const app = e()

config()
DbConnection()

app.use(e.json())
app.use('/', app_routes)

app.listen(3000, () =>{ console.log("Server is runnning at 3000") })