import express from 'express'
const hotelRoutes = express.Router()
import {getHotels , getHotel, createHotel} from '../controllers/hotels.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


const MYMES_TYPES = {
    "image/jpg" : "jpg",
    "image/png" : "png",
    "image/jpeg" : "jpeg",
    "image/svg" : "svg"
}

const uploadDir = path.join( __dirname , '../uploads')
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

const stockage = multer.diskStorage({
    destination : (req , file , cd ) => {
        cd(null , uploadDir )
        
        },
        filename : (req , file , cd ) => {
            const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 19)
            const extension = MYMES_TYPES[file.mimetype]

            cd(null , 
            `${file.fieldname}_${uniqueSufix}.${extension}` )
        }})

// file.fieldname+"_"+ uniqueSufix +"."+ extension

const uploads = multer ({ storage : stockage })


hotelRoutes.get('/getHotels',  getHotels)
hotelRoutes.get('/hotel/:id',  getHotel)
hotelRoutes.delete('/hotel/id' , )

hotelRoutes.post('/create' ,uploads.single('image') , createHotel  )

// routes.put('/' , updateProduct)

export default  hotelRoutes;