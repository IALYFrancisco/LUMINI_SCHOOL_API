import axios from "axios"

const credentials = Buffer.from(`${process.env.MVOLA_CONSUMER_KEY}:${process.env.MVOLA_CONSUMER_SECRET}`).toString("base64")

export const GenerateAccessToken = ( request, response, next ) => {
    axios.post(`${process.env.MVOLA_API_ENDPOINT}/token`, {}, { headers: { Authorization: `Basic ${credentials}` } })
    .then()
    .catch()
    .finally(()=>{ next() })
}

export function RefreshToken(){
    setInterval( GenerateAccessToken , 55 * 60 * 1_000)
}