const express = require('express')
const bodyparser= require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./Api/routes/api')
const cors=require('cors')
const app = express()
dotenv.config()
app.use(express.static('uploads'))
app.use(function(req,res, next){
     res.header("Access-Control-Allow-Origin","*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-TypeError, Accept");
     next();

});
app.options('*', cors())
app.use(bodyparser.json())
app.use(cors())



// const jwt = require('jsonwebtoken')



// פונקציית חיבור למסד
// mongoose.connect("process.env.LOCAL_URI", {})
//     .then(() => {
//         console.log(`connection to mongoDb succeed!`);
//     })
//     .catch(error => {
//         console.log({ error });
//     })

// פונקציה מובנית שמתחברת למסד
// לפי המחרוזת שמקבלת בסוגריים
const connectToDB = async () => {
     await mongoose.connect(process.env.LOCAL_URI)
}

// משתנה מכיל את המסד
const database = mongoose.connection

// במקרה של כשלון
database.on('error', (error) => {
    console.log('error');
    console.log(error.message);
})
// במקרה של הצלחה
database.once('connected', () => {
    console.log('connection succeed!');
})

module.exports = connectToDB
connectToDB()

app.use('/', router)

//יצירת שרת

//מאזין -PORT שעליו ירוץ
app.listen(3001,(()=>{
console.log("runing")}))


app.get('', (req, res) => {
    res.status(200).send('😜')
})