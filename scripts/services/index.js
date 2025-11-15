import { randomBytes } from "crypto"
import { HashPassword } from "../../app/services/authentication.js"
import { User } from "../../app/models/User.js"
import { disconnect } from "mongoose"
import { DbConnection } from "../../app/services/db_connection.js"
import chalk from "chalk"

export async function CreateSuperuser(){
    try{
        console.log(chalk.bgHex('#4a78a6').hex("#fffbfc")("Création de superutilisateur."))
        DbConnection()
        if(process.env.SUPERUSER_EMAIL && process.env.SUPERUSER_NAME){
            let _user = await User.findOne({email: process.env.SUPERUSER_EMAIL})
            let user = await User.findOne({status: 'superuser'})
            if(user || _user){
                console.log(chalk.bgHex('#6e4d0cff').hex("#fffbfc")('Maybe a superuser already exist or maybe an user with provided email already exist.'))
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
                    console.log('Superuser created in the database.')
                    return superuser
                }
            }
        }else{
            console.log('Error creating superuser, SUPERUSER_NAME and SUPERUSER_EMAIL aren\'t defined.')
            return undefined
        }
    }catch(err){
        console.log('Error creating superuser.')
        return undefined
    }finally{
        await disconnect()
    }
}