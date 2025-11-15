import { CreateSuperuser } from "./services/index.js";
import fs from 'fs'
import path from "path";
import os from 'os'
import { config } from "dotenv";
import chalk from "chalk";

config({ quiet: true })

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
            console.log(chalk.bgHex('#4a78a6').hex("#fffbfc")(`Superuser informations are saved at ${filePath}`))
            console.log(chalk.bgHex('#098702ff').hex('#fffbfc')('Done !'))
        }
    }
    catch(err){
        console.log(err)
        console.log(chalk.bgHex('#870202ff').hex('#fffbfc')('Error saving local the superuser informations.'))
    }
}

CreateSuperuserAndSaveLocal()