const mongoose = require('mongoose')

const PublisherSchema = mongoose.Schema({
    phone: {
        type: String
    }, 
    secondPhone: {
        type: String
    },
    password: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true,
        // regex - ביטויים רגולריים
        match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    }, 
    decription: String,   
    apartment: [{ 
        type: mongoose.Types.ObjectId,
            ref:'Apartment'
      }]
})


module.exports = mongoose.model('Publisher', PublisherSchema)