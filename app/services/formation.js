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
            response.status(201).json(result)
    }catch(err){
        response.status(500).json(err)
    }
    response.json(request.body)
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

export const staticFilesService = e.static(path.join(__dirname, 'app/public'))

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 15*1024*1024 }
})