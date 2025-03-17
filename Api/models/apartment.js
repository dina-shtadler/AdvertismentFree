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
    datend:{type:Date,
        require:true
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
    floor: {
        type: Number,
        require: true
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
        type: String,
        require: false
    },
    phone: {
        type: String
    }, 
    secondPhone: {
        type: String
    },
    email: {
        type: String,
        require: true,
        // regex - ביטויים רגולריים
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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