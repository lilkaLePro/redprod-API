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
    origin : process.env.FRONT_URL || 'http://localhost:3000',
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))
// routes
app.use("/api/hotels" , hotelRoutes )
app.use("/api/auths" , userRoutes )
app.use("/uploads", express.static(path.join(__dirname,"..","uploads")))

const db = process.env.DB
const PORT = process.env.PORT

mongoose.connect(db)
.then(() => {
            app.listen(PORT, () => {
                console.log(' conected to the database')
                console.log(` run on port ${PORT} `)
            })
}).catch(() => console.log('error , conection failed'))