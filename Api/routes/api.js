const express = require('express')
const router = express.Router()

const apartmentController = require('../controllers/apartment')
const cityController = require('../controllers/city')
const clientController = require('../controllers/client')
const kategoryController = require('../controllers/kategory')
const publisherController = require('../controllers/publisher')
const { checkAuth ,upload} = require('../../middelweares')

router.get('', (req, res) => {
    res.send('👩‍🦰 👩‍🦱 👱‍♀️ 👳‍♀️ 👦')
})

router.get('/getAll', apartmentController.getAll)
router.get('/getAllByKodpublisher/:kodPublisher', apartmentController.getAllByKodpublisher)
router.get('/getAllByKodKategory/:kodKategory', apartmentController.getAllByKodKategory)
router.get('/getAllByKodCity/:kodCity', apartmentController.getAllByKodCity)
router.get('/getAllByNumBeds/:numBeds', apartmentController.getAllByCountBeds)
router.get('/getAllByPriceToNight/:SmallerThen/:BiggerThen', apartmentController.getAllByPriceToNight)


router.get('/getById/:id', apartmentController.getById)
router.get('/getByIdAndnumDays/:id/:numDays', apartmentController.getById)

router.post('/createApartment/:kodPublisher', checkAuth, upload.single('picture'), apartmentController.createApartment)
router.put('/updateApartment/:kodPublisher', checkAuth, apartmentController.update)
router.delete(`/removeApartment/:id/:kodPublisher`, checkAuth, apartmentController.removeApartment)
router.post(`/registerP`, publisherController.registerP)

router.get(`/loginp/:email/:password`, publisherController.loginp)
router.post(`/registerc`, clientController.registerc)


router.get(`/loginc/:email/:password`, clientController.loginc)
router.post('/AddCity/:kodPublisher', checkAuth, cityController.AddCity)
router.get('/getAllCities', cityController.getAll)
router.get('/getWeather/:id', cityController.getWeather)
//kategirya
router.post('/Addkategory/:kodPublisher', kategoryController.AddKategory)
router.get('/getAllKategorys', kategoryController.getAll)
module.exports = router

