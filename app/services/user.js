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

export async function ChangeUserStatus(request, response) {
    try{
        let user = await User.findByIdAndUpdate(request.body.userId, request.body.update)
        let result = await user.save()
        if(result){
            response.status(200).end()
        }
    }
    catch(err){
        response.status(500).end()
    }
}

export async function DeleteAccount(request, response) {
    try{
        // let user = await User.findById(request.data._id)
        console.log(request.body)
    }
    catch(err){
        response.status(500).end()
    }
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