import { compare, hash } from "bcrypt";
import { User } from "../models/User.js";

export async function Register(request, response) {
    try {
        if(request.body){
            let user = await User.findOne({ email: request.body.email })
            if(user){
                response.status(409).end()
            }else{
                request.body.password = await HashPashword(request.body.password)
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
        let user = await User.findOne({ email: request.body.email })
        if(user){
            
        }else{
            response.status(401).end()
        }
    }
    catch(err){

    }
}

async function HashPashword(plainText) {
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