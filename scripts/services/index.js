import chalk from 'chalk'
import { randomBytes } from "crypto";
import { HashPashword } from '../../app/services/authentication';


async function createSuperuser() {
    try{
        console.log(chalk.yellow("Creating superuser..."))
        let superuserPassword = randomBytes(32).toString('hex')
        let superuserHashedPassword = await HashPashword(superuserPassword)
        let superuser = { 
            name: process.env.SUPERUSER_NAME,
            email: process.env.SUPERUSER_EMAIL,
            password: null,
            role: 'admin'
        }

    }
    catch(err){

    }
}