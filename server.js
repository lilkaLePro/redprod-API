import express from 'express';
import mongoose from 'mongoose';
import hotelRoutes from './routes/hotel.js';
import cors from 'cors';
import userRoutes from './routes/auth.js';
import path from 'path'
import { __dirname } from './routes/hotel.js';
const app = express();
import { configDotenv } from 'dotenv';
configDotenv()

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cors({
    origin : process.env.FRONT_URL || "locahost://3000",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))
// app.use((req , res , next) => {
//     res.setHeader('Access-Control-Allow-Origin' , "*")
//     res.setHeader('Access-Control-Allow-Origin' , "Origin, X-request-with, Accept, contentType, authorization")
//     res.setHeader('Access-Control-Allow-Methods' , "GET, POST, PUT, DELETE, PATCH , OPTIONS")
// })
console.log(process.env.FRONT_URL)
//routes
app.use("/api/hotels" , hotelRoutes )
app.use("/api/auths" , userRoutes )
app.use("/uploads", express.static(path.join(__dirname,"..","uploads")))

const DB = process.env.DB
const PORT = process.env.PORT

mongoose.connect(DB)

.then(() => {
            app.listen(PORT, () => {
                console.log(' conected to the database')
                console.log(` run on port ${PORT} `)
            })
}).catch(() => console.log('error , DB conection failed'))


