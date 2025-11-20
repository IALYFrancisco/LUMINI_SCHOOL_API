export function GetUserInformations(request, response) {
    response.status(200).json(request.session.user)
}

export function isAdminOrSuperuser(request, response, next) {
    if(request.session && request.session.user && (request.session.user.status === "superuser" || request.session.user.status === "admin")){
        next()
    }else{
        return response.status(401).end()
    }
}