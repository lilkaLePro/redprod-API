import express  from 'express'
import {createUser , connectUser , getUsers} from '../controllers/auth.js'


const userRoutes = express.Router()

const authmidleware = (req , res , next ) => {
    const authHeader = req.headers['authorization']

    if(!authHeader) return res.sendStatus(401).json({message : "header error"})

    const token = authHeader.split(' ')[1]
    jwt.verify(token , process.env.JWT_SECRET , (err , user) => {
        if(err) return res.sendStatus(403)
            res.user = user
        next()
    })
}

userRoutes.post('/create' , createUser)
userRoutes.post('/connect' , connectUser)

userRoutes.get('/usersData' , getUsers)

export default   userRoutes ;

