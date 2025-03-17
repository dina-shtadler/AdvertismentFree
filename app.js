const express = require('express')
const bodyparser= require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Apartment = require('./Api/models/apartment');  // החלף לפי נתיב המודל שלך

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
require('dotenv').config();
// פונקציה להתחברות למסד הנתונים
async function connectToDatabase() {
    try {
        // טוען את ה-URI של MongoDB מהקובץ .env
        const mongoURI = process.env.PUBLIC_URL;

        // מתחברים למסד הנתונים
        await mongoose.connect(mongoURI);

        console.log('התחברת בהצלחה למסד הנתונים');
        
Apartment.collection.createIndex({ kodPublisher: 1 });
Apartment.collection.createIndex({ kodKategory: 1 });
Apartment.ensureIndexes()
    .then(() => console.log('Indexes created successfully!'))
    .catch(err => console.error('Error creating indexes:', err));

    } catch (err) {
        console.error('שגיאה בהתחברות למסד הנתונים:', err);
    }
}

// קריאה לפונקציה
connectToDatabase();


// module.exports = connectToDB;
     

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
// const connectToDB = async () => {
//      await mongoose.connect(process.env.LOCAL_URI)
// }

// משתנה מכיל את המסד
// const database = mongoose.connection

// // במקרה של כשלון
// database.on('error', (error) => {
//     console.log('error');
//     console.log(error.message);
// })
// // במקרה של הצלחה
// database.once('connected', () => {
//     console.log('connection succeed!');
// })

// module.exports = connectToDB
// connectToDB()

app.use('/', router)

//יצירת שרת

//מאזין -PORT שעליו ירוץ
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('', (req, res) => {
    res.status(200).send('😜')
})
