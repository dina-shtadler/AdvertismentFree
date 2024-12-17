const City = require("../models/city")
const Weather=require("../models/Weather")
const publisher = require("../models/publisher")

// const request = require('request')

module.exports = {

AddCity: (req, res) => {
    console.log(req.body)
    publisher.findById({ _id: req.params.kodPublisher})
.then(()=>{
    const city = new City(req.body)     
              city.save()
})
    .catch((err)=>{                 
         res.status(404).send({ error: err.message })
})},
getAll: (req, res) => {
    City.find()
        // בהצלחה מתקבל מערך המכיל את כל האובייקטים המתאימים
        .then((cities) => {
            res.status(200).send({ cities })
        })
        .catch((err) => {
            res.status(404).send({ error: err.message })
        })
},
 getWeather:(req, res) => {
    City.findById({  _id: req.params.id })
    // בהצלחה נקבל את האובייקט הרצוי
    .then((city) => {
    const requestApi = () => {
        return new Promise((resolve, reject) => {
            request(`http://api.openweathermap.org/data/2.5/weather?q=${city.nameCity},&appid=29e21eb08b02f857be9490804657ae5c`,
                (err, res, body) => {
                    if (err)
                        reject(err)
                    else
                        resolve(body)
                })
        })
    }

    requestApi()
        .then((body) => {
            const apiParameters = JSON.parse(body)
            const newWeather = new Weather({
                city: apiParameters.name,
                weather: apiParameters.weather.main,
                description: apiParameters.weather.description,
                temp: kelvinToCelsius(apiParameters.main.temp),
                temp_min: kelvinToCelsius(apiParameters.main.temp_min),
                temp_max: kelvinToCelsius(apiParameters.main.temp_max),
                user: req.params.userId
            })
            newWeather.save()
                .then((weather) => {
                    User.findByIdAndUpdate({ _id: req.params.userId }, { $push: { 'weathers': weather._id } }, { new: true })
                        .then((user) => {
                            res.status(200).send({ weather })
                        })
                        .catch((error) => {
                            res.status(400).send(error.message)
                        })
                })
                .catch((error) => {
                    res.status(400).send(error.message)
                })
        })
        .catch((error) => {
            res.status(400).send(error.message)
        })
})}
}