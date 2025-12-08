import { User } from "../models/User.js"

export async function GetUser(request, response){
    try{
        let users = await User.find({ $nor: [{ status: 'superuser' }] })
        response.status(200).json(users)
    }
    catch(err){
        response.status(500).end(err.message)
    }
}

export function GetUserInformations(request, response) {
    response.status(200).json(request.session.user)
}

export function isAdminOrSuperuser(request, response, next) {
    if(request.session && request.session.user && (request.session.user.status === "superuser" || request.session.user.status === "admin")){
        next()
    }else{
        return response.status(401).end()
    }
}

export function isSuperuser(request, response, next) {
    if(request.session && request.session.user && request.session.user.status === "superuser"){
        next()
    }else{
        return response.status(401).end()
    }
}