import e from "express"

export const authentication_router = e.Router()

authentication_router.post('/register', (request, response)=>{
    response.status(200).json('Do you want to create an account??')
})