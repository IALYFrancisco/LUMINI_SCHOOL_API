import multer, { memoryStorage } from "multer"

export async function AddFormation(request, response) {
    console.log(request.body)
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

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 15*1024*1024}
})