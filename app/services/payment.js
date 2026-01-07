import axios from "axios"

var cache = {
    access_token: null,
    expires_at: 0
}

export async function InitiateTransaction(request, response) {
    try{
        const access_token = await GenerateAccessToken()
        if(!access_token){
            return response.status(500).end()
        }
    }
    catch{}
}

export async function GenerateAccessToken() {

    if(cache.access_token && Date.now() < cache.expires_at){
        return cache.access_token
    }

    const credentials = Buffer.from(`${process.env.MVOLA_CONSUMER_KEY}:${process.env.MVOLA_CONSUMER_SECRET}`).toString("base64")

    try{
        const response = await axios.post(
            `${process.env.MVOLA_API_ENDPOINT}/token`,
            new URLSearchParams({ grant_type: "client_credentials", scope: "EXT_INT_MVOLA_SCOPE" }),
            { headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-cache" } }
        )
        const { access_token, expires_in } = response.data
        cache = {
            access_token: access_token,
            expires_at: Date.now() + (expires_in - 60) * 1000
        }
        return access_token
    }
    catch{ return null }

}