export async function SendClientEmail(request, response){
    try{
        console.log(request.body)
        response.status(200).end()
    }catch(err){
        response.status(500).end()
    }
}