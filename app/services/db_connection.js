import chalk from "chalk";
import { connect } from "mongoose";

export function DbConnection() {
    connect(process.env.DB_URI)
        .then(()=>{ console.log(chalk.bgHex('#098702ff').hex('#fffbfc')('Database connection success.')) })
        .catch((err)=>{ console.log('Database connection error :' + err) })
}