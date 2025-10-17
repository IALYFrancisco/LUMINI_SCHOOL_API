import e from "express"
import { app_routes } from "./app/routes/index.js"
import { config } from "dotenv"
import { DbConnection } from "./app/services/db_connection.js"
import session from "express-session"
import MongoStore from "connect-mongo"

const app = e()

config()
DbConnection()

app.use(e.json())
app.use('/', app_routes)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
        ttl: 14 * 24 * 60 * 60
    })
}))

app.listen(3000, () =>{ console.log("Server is runnning at 3000") })