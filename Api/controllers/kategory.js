const Kategory = require("../models/kategory")
const publisher= require("../models/publisher")
// const request = require('request')

module.exports = {

AddKategory: (req, res) => {
   const id=req.params.kodPublisher
    publisher.findById(id)
    
.then(()=>{
    const kategory = new Kategory(req.body)     
              kategory.save()
})
    .catch((err)=>{          
            res.status(404).send({ error: err.message })

})
},
getAll: (req, res) => {
    Kategory.find()
        // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
        .then((kategorys) => {
            res.status(200).send({ kategorys })
        })
        .catch((err) => {
            res.status(404).send({ error: err.message })
        })
},
}