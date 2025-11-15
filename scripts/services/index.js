import { randomBytes } from "crypto"
import { HashPassword } from "../../app/services/authentication.js"
import { User } from "../../app/models/User.js"
import { disconnect } from "mongoose"
import { DbConnection } from "../../app/services/db_connection.js"
import chalk from "chalk"

async function CheckSuperuserAndHisEmail() {
    try{
        console.log(chalk.bgHex('#4a78a6').hex("#fffbfc")("Checking superuser and his email in the database."))
        await DbConnection()
        if(process.env.SUPERUSER_EMAIL && process.env.SUPERUSER_NAME){
            let _user = await User.findOne({email: process.env.SUPERUSER_EMAIL})
            let user = await User.findOne({status: 'superuser'})
            if(user || _user){
                console.log(chalk.bgHex('#6e4d0cff').hex("#fffbfc")('Maybe a superuser already exist or maybe an user with provided email already exist.'))
                return true
            }else{
                return false
            }
        }else{
            console.log(chalk.bgHex('#870202ff').hex('#fffbfc')('Error creating superuser, SUPERUSER_NAME and SUPERUSER_EMAIL aren\'t defined.'))
            return undefined
        }
    }catch(err){
        console.log(chalk.bgHex('#870202ff').hex('#fffbfc')('Error checking superuser in the database.'))
        return undefined
    }finally{
        await disconnect()
    }
}

export async function CreateSuperuser(){
    try{
        console.log(chalk.bgHex('#4a78a6').hex("#fffbfc")("Création de superutilisateur."))
        await DbConnection()
        let checkingResult = await CheckSuperuserAndHisEmail()
        if(checkingResult === true){
            return undefined
        }else if(checkingResult === undefined){
            return undefined
        }else{
            let superuserPassword = randomBytes(32).toString('hex')
            let hashedSuperuserPassword = await HashPassword(superuserPassword)
            let superuser = {
                name: process.env.SUPERUSER_NAME,
                email: process.env.SUPERUSER_EMAIL,
                status: 'superuser',
                password: `${hashedSuperuserPassword}`
            }
            let newSuperuser = new User(superuser)
            let result = await newSuperuser.save()
            if(result){
                superuser.password = superuserPassword
                console.log(chalk.bgHex('#098702ff').hex('#fffbfc')('Superuser created in the database.'))
                return superuser
            }else{
                console.log(chalk.bgHex('#870202ff').hex('#fffbfc')('Error saving superuser in the database.'))
                return undefined
            }
        }
    }catch(err){
        console.log(chalk.bgHex('#870202ff').hex('#fffbfc')('Error creating superuser.'))
        return undefined
    }finally{
        await disconnect()
    }
}