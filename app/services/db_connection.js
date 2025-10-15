import { connect } from "mongoose";

export function DbConnection() {
    connect(process.env.DB_URI)
        .then(()=>{ console.log('Database connection success.') })
        .catch((err)=>{ console.log('Database connection error :' + err) })
}