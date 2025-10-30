export async function AddFormation(request, response) {
    console.log(request.body)
    response.json(request.body)
}