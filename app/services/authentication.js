import { User } from "../models/User.js";

export async function Register(request, response) {
    try {
        if(request.body){
            let newUser = User(request.body)
            await newUser.save()
            if(newUser){
                response.status(201).end()
            }
        }else{
            response.status(401).json('Request body isn\'t defined.')
        }
    }catch(err){
        response.status(401).json(err)
    }
}