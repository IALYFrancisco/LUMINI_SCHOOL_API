import { connect } from "mongoose";

export async function DbConnection() {
    try {
        connect()
    }catch(err){

    }
}