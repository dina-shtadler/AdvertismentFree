const mongoose = require('mongoose')

const ApartmentSchema = mongoose.Schema({

    nameApartment: {
        type: String,
        require: true
    }, 
    picture: {
        type: String,
        require: false
    }, 
    describe: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: false
    },
    neighbourhood: {
        type: String,
        require: false
    },
    street: {
        type: String,
        require: false
    },
    numBuild: {
        type: Number,
        require: false
    },
    numRooms: {
        type: Number,
        require: false
    },
    squareMeter: {
        type: Number,
        require: false
    },
    porch: {
        type: String,
        require: false
    },
    porchSquareMeter: {
        type: Number,
        require: false
    },
    extras: {
        type: String,
        require: false
    },
    realEstateAgency: {
        type: String,
        require: false
    },
    price: {
        type: Number,
        require: false
    },
    kodKategory: 
    
    {     type:[{
            type: mongoose.Types.ObjectId,
            ref: 'Kategory'}]
           , require: true
        },
 kodCity: 
  { type:[{    type: mongoose.Types.ObjectId,
            ref: 'City'}]
            , require: false
        },
        kodPublisher: 
        {type:[{
            type:mongoose.Types.ObjectId,
            ref: 'Publisher'}]
            , require: true 

        }
    
})


module.exports = mongoose.model('Apartment', ApartmentSchema)