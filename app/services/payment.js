import axios from "axios"
import { Registration } from "../models/Registration.js"
import { Formation } from "../models/Formation.js"

var cache = {
    access_token: null,
    expires_at: 0
}

export async function InitiateTransaction(request, response) {
    try{
        const access_token = await GenerateAccessToken()
        if(!access_token){
            return response.status(500).json()
        }
        let registration = await Registration.findById(request.body.registration, {_id: 0, formation_id:1})
        let formation = await Formation.findById(registration.formation_id, { _id: 0, title: 1, coursePrice: 1 })
        let transactionBody = {
            amount: `${formation.coursePrice}`,
            currency: "Ar",
            descriptionText: `Paiement du droit de formation ${formation.title}.`,
            requestDate: new Date().toISOString(),
            debitParty: [{ key: "msisdn", value: request.body.clientMsisdn }],
            creditParty: [{ key: "msisdn", value: "0343500004" }],
            metadata: [{ key: "partnerName", value: "LUMINI School" }],
            requestingOrganisationTransactionReference: crypto.randomUUID(),
            originalTransactionReference: crypto.randomUUID()
        }
        const _response = await axios.post(`${process.env.MVOLA_API_ENDPOINT}/mvola/mm/transactions/type/merchantpay/1.0.0/`, transactionBody, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Version": "1.0",
                "X-CorrelationID": crypto.randomUUID(),
                "UserLanguage": "FR",
                "UserAccountIdentifier": "msisdn;0343500004",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        })
        return response.status(200).end()
    }
    catch{
        return response.status(500).end()
    }
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