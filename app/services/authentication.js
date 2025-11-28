import { compare, hash } from "bcrypt";
import { User } from "../models/User.js";

export async function Register(request, response) {
    try {
        if(request.body){
            let user = await User.findOne({ email: request.body.email })
            if(user){
                response.status(409).end()
            }else{
                request.body.password = await HashPassword(request.body.password)
                let newUser = User(request.body)
                await newUser.save()
                if(newUser){
                    response.status(201).end()
                }
            }
        }else{
            response.status(401).json('Request body isn\'t defined.')
        }
    }catch(err){
        response.status(400).json(err)
    }
}

export async function Login(request, response) {
    try{
        var user = await User.findOne({ email: request.body.email })
        if(user){
            let result = await ComparePassword(request.body.password, user.password)
            if(result){
                request.session.user = { _id: user._id, name: user.name, email: user.email, status: user.status, phoneNumber: user.phoneNumber }
                response.status(200).end()
            }else{
                response.status(401).end()
            }
        }else{
            response.status(209).end()
        }
    }
    catch(err){
        response.status(500).end()
    }
}

export async function Logout(request, response) {
    try{
        if(request.session && request.session.user){
            request.session.destroy((err)=>{
                if(err){
                    return response.status(500).end()
                }
                response.clearCookie("connect.sid", { path: "/" })
                return response.status(200).end()
            })
        } else {
            return response.status(209).end()
        }
    }
    catch(err){
        response.status(500).end()
    }
}

export async function HashPassword(plainText) {
    try {
        let _hash = await hash(plainText, 10)
        return _hash
    }catch(err){
        return undefined
    }
}

async function ComparePassword(_plain, _hash) {
    let result = await compare(_plain, _hash)
    if(result){
        return true
    }else{
        return false
    }
}

export function isAuthenticated(request, response, next) {
    if(request.session && request.session.user){
        next()
    }else{
        return response.status(401).end()
    }
}

export function isNotAuthenticated(request, response, next){
    if(request.session && request.session.user){
        return response.status(401).end()
    }else{
        next()
    }
}