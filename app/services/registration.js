import { Registration } from "../models/Registration.js"
import { User } from "../models/User.js"

export async function CreateRegistration(request, response) {
    try{
        var userPhoneNumber = request.body.userPhoneNumber
        let formationId = request.body.formation._id
        let newRegistration = {
            formation_id: formationId,
            user_id: request.session.user._id
        }
       let registration = new Registration(newRegistration)
       let result = await registration.save()

       let user = await User.findByIdAndUpdate(request.session.user._id, {phoneNumber: userPhoneNumber})

       if(result && user){
            request.session.user.phoneNumber = userPhoneNumber
            response.status(201).end()
       }
       
    }
    catch(err){
        response.status(500).end()
    }
    
}

export async function GetRegistrations(request, response){
    try{
        let registrations = await Registration.find()
        console.log(registrations)
        // response.status(200).json(registrations)
        response.status(200).end()
    }
    catch(err){
        response.status(500).end()
    }
}