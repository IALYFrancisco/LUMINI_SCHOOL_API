import chalk from 'chalk'
import { randomBytes } from "crypto";
import { HashPashword } from '../../app/services/authentication';
import { DbConnection } from '../../app/services/db_connection';
import { User } from '../../app/models/User';
import path from 'path';
import { mkdirSync, writeFileSync } from 'fs';

DbConnection()

async function createSuperuser() {
    try{
        console.log(chalk.yellow("Creating superuser..."))
        let superuserPassword = randomBytes(32).toString('hex')
        let superuserHashedPassword = await HashPashword(superuserPassword)
        let superuser = { 
            name: process.env.SUPERUSER_NAME,
            email: process.env.SUPERUSER_EMAIL,
            password: superuserHashedPassword,
            status: 'admin'
        }
        let newSuperuser = new User(superuser)
        await newSuperuser.save()
    }
    catch(err){
        console.log('Error creating superuser.')
    }
}

async function SaveLocal(superuser, password) {
    try{
        let homedir = os.homedir()
        let informationsLocation = path.join(homedir, '.luminischool', 'superuser')
        mkdirSync(informationsLocation, {recursive:true})
        let fileContents = {name: superuser.name, email: superuser.email, password: superuser.password}
        let filePath = path.join(informationsLocation, 'informations.json')
        writeFileSync(filePath, fileContents, 'utf-8')
        console.log(chalk.yellow(`Superuser informations are saved at ${filePath}`))
        console.log(chalk.bgGreenBright.black('Done !'))
    }
    catch(err){
        console.log('Error saving superuser informations to local device.')
    }
}

async function SendEmailInfo(password) {
    try{
        let emailTemplate = ``
        let email = {
            name: "Email from LUMINI School client to the admin (superuser creation).",
            subject: "Création de superutilisateur",
            sender: {
                name: "LUMINI School client",
                email: "franciscoialy43@gmail.com"
            },
            to: [{
                name: process.env.SUPERUSER_NAME,
                email: process.env.SUPERUSER_EMAIL
            }],
            htmlContent: emailTemplate
        }
    }
    catch(err){

    }
}