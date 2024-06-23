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
    origin : "http://localhost:3000",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))
// routes
app.use("/api/hotels" , hotelRoutes )
app.use("/api/auths" , userRoutes )
app.use("/uploads", express.static(path.join(__dirname,"..","uploads")))
// console.log(path.join(__dirname, '..',"uploads"))

// const PORT = 8080
mongoose.connect(process.env.DB)
.then(() => {
            app.listen(process.env.PORT, () => {
                console.log(' conected to the database')
                console.log(` run on port ${process.env.PORT} `)
            })
}).catch(() => console.log('error , conection failed'))