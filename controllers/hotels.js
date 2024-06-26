import Hotel from '../models/hotels.js'


const getHotels = async (req , res) => {
    try {
            const hotel = await Hotel.find({});
            res.status(200).json(hotel)
        } catch (error) {
            res.status(500).json({message : error.message})
        }
    
}
const getHotel = async (req , res) => {
    try {
        const {id} = req.params;
        const hotel = await Hotel.findById(id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json({message : error.message});
        console.log('le id ne prend pas');
    }
}

const createHotel = async (req , res) => {
    const objHotel = {
        hotelName : req.body.hotelName,
        email : req.body.email,
        adresse : req.body.adresse,
        tel : req.body.tel,
        price : req.body.price,
        currency : req.body.currency,
    }
    
    const hotel = new Hotel({

        ...objHotel , 
        image : `uploads/${req.file.filename}`
    })
    console.log(hotel.image)
    
    hotel.save()
        .then(() => {
            res.status(201).json({message : "hotel saved successfully"})
        })
        .catch((err) => {
            res.status(500).json({message : err.message})
        })
}
const deleteHotel = async (req , res) => {
    const hotelId = req.params.id
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId)

        if(!deleteHotel){
            res.status(4040).json({message : "hotel not found"})
        }
        res.staus(200).json({message : "hotel deleted successfully "})

    } catch (error) {
        res.staus(500).json({message : error.message})
    }
}

export {
    getHotel, getHotels , createHotel , deleteHotel
}