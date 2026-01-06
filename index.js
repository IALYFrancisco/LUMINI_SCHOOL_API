import e from "express"
import { app_routes } from "./app/routes/index.js"
import { config } from "dotenv"
import { DbConnection } from "./app/services/db_connection.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import { staticFilesService } from "./app/services/formation.js"
import { corsConfiguration } from "./app/services/cors.js"
import chalk from "chalk"
import { RefreshToken, GenerateAccessToken } from "./app/services/payment.js"

const app = e()

config()
DbConnection()
GenerateAccessToken()
RefreshToken()

app.set("trust proxy", 1);

app.use(corsConfiguration)

app.use(staticFilesService)

app.use(e.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
        httpOnly: true,
        secure: JSON.parse(process.env.APP_PROD),
        sameSite: JSON.parse(process.env.APP_PROD) ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use((request, response, next)=>{
    response.locals.user = request.session.user
    next()
})

app.use('/', app_routes)

app.listen(3000, () =>{ console.log(chalk.bgHex('#4a78a6').hex("#fffbfc")(`Server is runnning at ${process.env.APP_DOMAIN}`)) })
