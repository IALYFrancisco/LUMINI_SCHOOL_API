import axios from "axios"


export const GenerateAccessToken = () => {
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
        await 
    })
    .catch(()=>{return})
}

export function RefreshToken(){
    setInterval( GenerateAccessToken , 55 * 60 * 1_000 )
}