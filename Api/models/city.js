const mongoose = require('mongoose')

const CitySchema = mongoose.Schema({
    nameCity: {
        type: String
    }, 
    
    Apartment: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Apartment'
        }
    ]
})


module.exports = mongoose.model('City', CitySchema)