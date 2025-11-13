export async function SendClientEmail(request, response){
    try{
        response.status(200).end()
    }catch(err){
        response.status(500).end()
    }
}