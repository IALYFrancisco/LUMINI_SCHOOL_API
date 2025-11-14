import { CreateSuperuser } from "./services/index.js";
import fs from 'fs'
import path from "path";
import os from 'os'
import { config } from "dotenv";
import { DbConnection } from "../app/services/db_connection.js";

config()
DbConnection()

async function CreateSuperuserAndSaveLocal(){
    try{
        let superuser = await CreateSuperuser()
        if(superuser){
            let homedir = os.homedir()
            let superuserInfosLocation = path.join(
                homedir,
                '.luminischool',
                'superuser'
            )
            fs.mkdirSync(superuserInfosLocation, { recursive: true })
            let fileContents = `{name: '${superuser.name}',email: '${superuser.email}',status: '${superuser.status}',password: '${superuser.password}'}`
            let filePath = path.join(superuserInfosLocation, 'informations.json')
            fs.writeFileSync(filePath, fileContents, 'utf-8')
            console.log(`Superuser informations are saved at ${filePath}`)
            console.log('Done !')
        }
    }
    catch(err){
        console.log(err)
        console.log('Error saving local the superuser informations.')
    }
}

CreateSuperuserAndSaveLocal()