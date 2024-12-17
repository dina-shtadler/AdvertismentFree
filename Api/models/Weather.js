const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema({
    city: {
        type: String
    },
    weather: {
        type: String
    },
    description: {
        type: String
    },
    temp: {
        type: Number
    },
    temp_min: {
        type: Number
    },
    temp_max: {
        type: Number
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Weather', weatherSchema)