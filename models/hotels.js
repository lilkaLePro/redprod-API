import mongoose, { model } from 'mongoose';
import Auth from './auth.js'

const HotelSchema =  mongoose.Schema(
    {
        hotelName : {
            type : String,
            required : true ,
        },
        adresse : {
            type : String,
            required : true
        },
        price : {
            type : String,
            required : true
        },
        currency : {
            type : String,
            required : true
        },
        tel : {
            type : String,
            required : true
        },
        image : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true
        },
        adminId : {
            type : String,
            model : Auth,
            id : "id",
        }
    }
)
const Hotel = mongoose.model("Hotel" , HotelSchema)

export default Hotel