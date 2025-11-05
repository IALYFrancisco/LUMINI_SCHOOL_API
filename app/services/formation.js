import e from "express"
import multer, { memoryStorage } from "multer"
import path from "path"
import { fileURLToPath } from 'url'
import { Formation } from "../models/Formation.js"
import sharp from "sharp"

export async function AddFormation(request, response) {
    try{
        if(!request.file) return response.status(400).end()
        let fileName = `${Date.now()}-${Math.round(Math.random()*1E9)}.jpeg`
        let newFormation = new Formation(request.body)
        newFormation.image = `formations/${fileName}`
        let result = await newFormation.save()
        if(result){
            let output = `./app/public/formations/${fileName}`
            await sharp(request.file.buffer).jpeg({ quality: 60 }).toFile(output)
        }
        response.status(201).json(`${process.env.APP_DOMAIN}`+result.image)
    }catch(err){
        response.status(500).json(err)
    }
}

export async function GetFormation(request, response){
    try{
        if(true){
            console.log(request.params)
        }
        let formations = await Formation.find({})
        response.status(200).json(formations)
    }catch(err){
        response.status(500).end()
    }
}

// export async function GetFormationWithFilters(request, response) {
//     try{
//         let formation = await Formation.find()
//     }
//     catch(err){
//         response.status(500).end()
//     }
// }

export async function DeleteFormation(request, response){
    try{
        let result = await Formation.findByIdAndDelete({ _id: request.body._id })
        response.status(200).end()
    }catch(err){
        response.status(500)
    }
}

const storage = memoryStorage()

const fileFilter = (request, file, cb)=>{
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error("File type not allowed."), false)
    }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const staticFilesService = e.static(path.join(__dirname, '../public'))

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 15*1024*1024 }
})