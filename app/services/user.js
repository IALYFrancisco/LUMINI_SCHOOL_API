import { User } from "../models/User.js"
import { ComparePassword, HashPassword } from "./authentication.js"

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

export async function ChangePassword(request, response){
    try{
        const { _id, currentPassword, newPassword } = request.body
        let user = await User.findById(_id)
        if(user){
            let result = await ComparePassword(currentPassword, user.password)
            if(result){
                let hashedNewPassword = await HashPassword(newPassword)
                if(hashedNewPassword){
                    let updatedUser = await User.findByIdAndUpdate(_id, { password: hashedNewPassword })
                    let updatedUserResult = await updatedUser.save()
                    if(updatedUserResult){
                        request.session.destroy((err)=>{
                            if(err){
                                return response.status(500).end()
                            }
                            response.clearCookie('connect.sid', { path: "/" })
                            return response.status(200).end()
                        })
                    }
                    else{
                        response.status(500).end()
                    }
                }
                else{
                    response.status(500).end()
                }
            }else{
                response.status(400).end()
            }
        }
        else{
            response.status(401).end()
        }
    }
    catch(err){
        response.status(500).end()
    }
}

export async function DeleteAccount(request, response) {
    try{
        let user = await User.findById(request.body._id)
        if(user){
            let result = await ComparePassword(request.body.password, user.password)
            if(result){
                request.session.destroy((err)=>{
                    if(err){
                        return response.status(500).end()
                    }
                    response.clearCookie('connect.sid', { path: "/" })
                    return response.status(200).end()
                })
                await User.findByIdAndDelete(request.body._id)
                response.status(200).end()
            }else{
                response.status(401).end()
            }
        }else{
            response.status(401).end()
        }
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