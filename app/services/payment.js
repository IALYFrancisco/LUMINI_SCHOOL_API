import axios from "axios"
import { createClient } from "redis"

export async function GenerateAccessToken() {

    let cachedToken = await redisClient.get("mvola:access_token")

    if(cachedToken){
        return cachedToken
    }

    let credentials = Buffer.from(`${process.env.MVOLA_CONSUMER_KEY}:${process.env.MVOLA_CONSUMER_SECRET}`).toString("base64")
    
    axios.post(
        `${process.env.MVOLA_API_ENDPOINT}/token`,
        { "grant_type": "client_credentials", "scope": "EXT_INT_MVOLA_SCOPE" },
        { headers: { 
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache" 
        }})
    .then( async (response)=>{
        const { access_token, expires_in } = response.data
        await redisClient.set("mvola:access_token", access_token, { EX: expires_in - 60 })
        return access_token
    })
    .catch(()=>{return})
}

const redisClient = createClient({
    url: "redis://localhost:6379"
})

redisClient.on('error', (err)=>{
    console.error("Redis error", err)
})

await redisClient.connect()