export function GetUserInformations(request, response) {
    response.status(200).json(request.session.user)
}

export function isAdmin(request, response, next) {
    if(request.session && request.session.user && request.session.user === "admin"){
        next()
    }else{
        return response.status(401).end()
    }
}