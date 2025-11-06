export function GetUserInformations(request, response) {
    response.status(200).json(request.session.user)
}