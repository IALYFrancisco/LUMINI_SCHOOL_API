import { Registration } from "../models/Registration.js"

export async function CreateRegistration(request, response) {
    try{
       let registration = new Registration(request.body)
       let result = await registration.save()
       if(result){
            response.status(201).end()
       } 
    }
    catch(err){
        response.status(500).end()
    }
    
}