import { User } from "../models/User.js";

export async function Register(request, response) {
    try {
        if(request.body){
            let user = await User.findOne({ email: request.body.email })
            if(user){
                response.status(409).end()
            }else{
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