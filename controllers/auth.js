import Auth from '../models/auth.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const createUser = async (req , res) => {
    console.log(req.body)
    try{
        // const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash( req.body.password , 10)
        console.log(passwordHash);

    const user = new Auth({
        userName : req.body.userName , 
        email : req.body.email , 
        password : passwordHash,
        id : Auth.lenght + 1,
        })
    
    const savedUser = await user.save();
    res.status(201).json(savedUser)
   }catch(error) {
     res.status(400).json({ error : error.message})
   }
}

// connection user
const connectUser = async (req , res, next) => {
    try {
        console.log("function called ");
            
            const {email , password } = req.body;
            console.log("here the email " ,  email);

            let user = await Auth.findOne({email: email})
            
            console.log("here the user " , user);
            
            if(!user) {
                console.log("user not found" );
                return res.status(400).json({message : "user not found"})
            }

            if( user && await bcrypt.compare(password , user.password)){
                const token = jwt.sign({ id : user.id } , process.env.JWT_SECRET , {expiresIn : '1h'} )
                res.json({token})
            }

            console.log("connection succeeded");

        
    } catch (error) {
        console.error('an error encured : ' , error)
        return res.status(500).json({message : "eurreur " , error})
    }

}

    

    const getUsers = async (req , res) => {
        try{
            const users = await Auth.find()
            res.status(200).json(users)
        }catch(error){
            res.status(500).json({message : error.message})
        }
    }

const deleteUser = async (req , res ) => {
    // try {   
    //     const {id } = req.params
    //     const deleteHotel = await Hotel.findByIdAndDelete(id)
        
    //     if(!deleteHotel) {
    //         res.status(500).json({message : "failed deleting"})
    //     }
    //     res.status(200).json({message : 'deleted successfully'})

    // }catch(error) {
    //     res.status(500).json({message : error.message})
    // }
}

export {
    createUser , connectUser , getUsers
}