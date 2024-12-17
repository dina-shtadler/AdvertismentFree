const jwt = require('jsonwebtoken')
const multer = require('multer')


//פונקציה שמסננת את סוגי הקבצים שאפשר להעלות
const fileFilter = (req, file, cb) => {
    console.log(file)
    //במקרה שלנו נאפשר רק קבצי בסיומת תמונה
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //true אם הקובץ מסוג מתאים נחזיר 
        cb(null, true)
    }
    //ואם לא - false
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
        filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports={

     // Autentication - אימות
    // Authorization - הרשאה

    checkAuth: (req, res, next) => {

        console.log(req.headers);
        console.log(req.body);
        if (!req.headers.authorization) {
            res.status(401).send({ error: `Autentication failed!` })
        }
        
        const token = req.headers.authorization.split(' ')[0]

        if (!token) {
            res.status(401).send({ error: `-Autentication failed!` })
        }
       // jwt.verify - זיהוי הטוקן - האם הוא תקין
        // מקבלת שלשה ארגומנטים:
        // 1. את הטוקן שנשלח מהלקוח
        // 2. את המחרוזת הייחודית של המערכת
        // 3. פונקצייה שמקבלת שגיאה או את הפיענוח
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: `Authorization failed!`, error })
            }
           
            // decoded = מפוענח
            if (decoded) {
                next()
            }
        })

    },
    upload: multer({
        // dest: 'uploads/',
        storage,
        //הגדרות לגבי הקובץ המועלה
        limits: {
            //2MB הקובץ יכול להיות עד גודל של 
            fileSize: 1024 * 1024 * 2
        },
        fileFilter
    })
}