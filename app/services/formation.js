import e from "express"
import multer, { memoryStorage } from "multer"
import path from "path"
import { fileURLToPath } from 'url'
import { Formation } from "../models/Formation.js"
import sharp from "sharp"

export async function AddFormation(request, response) {
    try{
        if(!request.file) {
            let newFormation = new Formation(request.body)
            let result = await newFormation.save()
            if(result){
                response.status(201).end()
            }
        }else{
            let fileName = `${Date.now()}-${Math.round(Math.random()*1E9)}.jpeg`
            let newFormation = new Formation(request.body)
            newFormation.image = `formations/${fileName}`
            let result = await newFormation.save()
            if(result){
                let output = `./app/public/formations/${fileName}`
                await sharp(request.file.buffer).jpeg({ quality: 60 }).toFile(output)
            }
            response.status(201).end()
        }
    }catch(err){
        console.log(err)
        response.status(500).json(err)
    }
}

export async function GetFormation(request, response){
    try{
        var { _id, title } = request.query
        if(_id || title){
            if(_id){
                if(request.session && request.session.user && (request.session.user.status === "superuser" || request.session.user.status === "admin")){
                    var formations = await Formation.find({ _id: _id })
                    response.status(200).json(formations)
                }else{
                    let formations = await Formation.find({ published: true, _id: _id })
                    response.status(200).json(formations)
                }
            }
            if(title){
                if(request.session && request.session.user && (request.session.user.status === "superuser" || request.session.user.status === "admin")){
                    var formations = await Formation.find({ title: { $regex: title, $options: 'i' }})
                    response.status(200).json(formations)
                }else{
                    let formations = await Formation.find({ published: true, title: { $regex: title, $options: 'i' }})
                    response.status(200).json(formations)
                }
            }
            if(formation.length===0){
                response.status(209).end()
            }else{
                response.status(200).json(formation)
            }
        }else{
            if(request.session && request.session.user && (request.session.user.status === "superuser" || request.session.user.status === "admin")){
                let formations = await Formation.find({})
                response.status(200).json(formations)
            }else{
                let formations = await Formation.find({ published: true })
                response.status(200).json(formations)
            }
        }
    }catch(err){
        response.status(500).end()
    }
}

export async function FormationPublication(request, response) {
    try{
        let formation = await Formation.findByIdAndUpdate(request.body.formationId, request.body.update)
        if(formation.published){
            formation.publishDate = null
        }else{
            formation.publishDate = Date.now()
        }
        await formation.save()
        if(formation){
            response.status(200).end()
        }
    }
    catch(err){
        response.status(500).end()
    }
}

export async function UpdateFormation(request, response){
    try{
        var { _id } = request.query
        if(!request.file){
            let formation = await Formation.findByIdAndUpdate(_id, request.body)
            let result = await formation.save()
            if(result){
                response.status(200).end()
            }
        }else{
            let fileName = `${Date.now()}-${Math.round(Math.random()*1E9)}.jpeg`
            let formation = await Formation.findOne({ _id: _id })
            formation.image = `formations/${fileName}`
            let result = await formation.save()
            if(result && request.body){
                let output = `./app/public/formations/${fileName}`
                await sharp(request.file.buffer).jpeg({ quality: 60 }).toFile(output)
                let _formation = await Formation.findByIdAndUpdate(_id, request.body)
                let _result = await _formation.save()
                if(_result){
                    response.status(200).end()
                }
            }
        }
    }
    catch(err){
        response.status(500).end()
    }
}

export async function DeleteFormation(request, response){
    try{
        let result = await Formation.findByIdAndDelete({ _id: request.body._id })
        response.status(200).end()
    }catch(err){
        response.status(500).end()
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