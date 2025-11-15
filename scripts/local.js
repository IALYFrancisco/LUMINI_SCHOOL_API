import { CreateSuperuser, superuserPassword } from "./services/index.js";
import fs from 'fs'
import path from "path";
import os from 'os'
import { config } from "dotenv";
import chalk from "chalk";
import { DbConnection } from '../app/services/db_connection.js'
import { disconnect } from "mongoose";

config({ quiet: true })

async function CreateSuperuserAndSaveLocal(){
    try{
        await DbConnection()
        let homedir = os.homedir()
        let superuserInfosLocation = path.join(
            homedir,
            '.luminischool',
            'superuser'
        )
        fs.mkdirSync(superuserInfosLocation, { recursive: true })
        let fileContents = `{name: '${process.env.SUPERUSER_NAME}',email: '${process.env.SUPERUSER_EMAIL}',status: 'superuser',password: '${superuserPassword}'}`
        let filePath = path.join(superuserInfosLocation, 'informations.json')
        await fs.writeFileSync(filePath, fileContents, 'utf-8')
        console.log(chalk.bgHex('#4a78a6').hex("#fffbfc")(`Superuser informations are saved at ${filePath}`))
        let _result  = await CreateSuperuser()
        console.log(chalk.bgHex('#098702ff').hex('#fffbfc')('Done!'))
    }
    catch(err){
        console.log(err)
        console.log(chalk.bgHex('#870202ff').hex('#fffbfc')('Error saving local the superuser informations.'))
    }finally{
        await disconnect()
    }
}

CreateSuperuserAndSaveLocal()