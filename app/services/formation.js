import e from "express"
import multer, { memoryStorage } from "multer"
import path from "path"
import { fileURLToPath } from 'url'

export async function AddFormation(request, response) {
    console.log(request.file)
    response.json(request.file)
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