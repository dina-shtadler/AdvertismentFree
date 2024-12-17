const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
   
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
  
})


module.exports = mongoose.model('Client', ClientSchema)