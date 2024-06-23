import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userName : {type : String , required : true, min : 2 , max : 30 },
    email : {type : String , required : true , unique : true },
    password : { type : String , required : true},
    
})
const Auth = mongoose.model("Auth" , UserSchema)

export default Auth;