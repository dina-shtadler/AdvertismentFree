const mongoose = require('mongoose')

const KategorySchema = mongoose.Schema({
   
    nameKategory: {
        type: String,
        require: false
    },
    decription: String, 
    Apartment: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Apartment'
        }
    ]
})
module.exports = mongoose.model('Kategory', KategorySchema)