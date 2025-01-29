// const Publisher = require("../models/publisher")
// const bcrypt = require('bcrypt')
// // התקנת הספריה - jsonwebtoken
// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')

// dotenv.config()

// module.exports = {
   

//     registerP: (req, res) => {
//   const { email, password,phone,secondPhone } = req.body  
           
//   Publisher.find({ email: { $eq: email } })
//             .then((publishers) => {
//                 if (publishers && publishers.length > 0) {
//                 return res.status(200).send({ message: `email has been exists already!` })
//                 }
//                 else{
//                 bcrypt.hash(password, 10, (error, hash) => {
//                     if (error) {
//                         return res.status(500).send({ error: error.message })
//                     }
//                     const publisher = new Publisher({    
                     
//                         email,
//                        password:hash,
//                        phone,
//                        secondPhone
                        
//                     })
//       return publisher.save()
                 
//                   })
//     }})
//             .then(() => {
//                 res.status(200).send({ message: `welcome to our application!` })
//             })
//             .catch((err) => {
//                 res.status(500).send({ error: err.message })
//             })                   },

//     // jwt
//     // json web token
//     loginp: (req, res) => {

//         const  email=req.params.email, password=req.params.password
// console.log(req.params)
//         Publisher.find({ email: { $eq: email } })
//             .then((publishers) => {
// console.log(email)
//                 // const user = users[0]
//                 const [publisher] = publishers
//                 if (!publisher) {
//                     res.status(404).send({ message: `email and password are not match!` })
//                 }
// console.log(publisher.password)
//                   bcrypt.compare(password, publisher.password, (error, result) => {
//                     if (error || !result) {
//                         return res.status(500).send({ error: 'Email and password are not matches!' })
//                     }
//                // token - שליחת מחרוזת
//                 // jwt.sign - יצירת מחרוזת האבטחה
//                 // מקבלת שלשה ארגומנטים
//                 // 1. אובייקט שיכיל את המאיינים שלפיהם ניצור את המחרוזת
//                 // 2. מחרוזת ייחודית למערכת שתצטרף לנ"ל
//                 // 3. אובייקט אפשרויות
//                 // הראנו דוגמה של הגדרת תוקף למחרוזת - עד שעה...
//                 const token = jwt.sign({ email, firstName: publishers.firstName }, process.env.SECRET, {
//                     // תוקף למחרוזת האבטחה
//                     expiresIn: '1hr' // hours
//                     // expiresIn:'1d' // days
//                     // expiresIn:'1s' // seconds
//                     // expiresIn:'1m' // minutes
//                     // expiresIn:'1' // miliseconds
//                 })

//                 res.status(200).send({ message: `login successfuly!`, publishers, token })
//               }  
//             )
        
//         })
//      }}
const Publisher = require("../models/publisher");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    registerP: (req, res) => {
        const { email, password, phone, secondPhone } = req.body;
    
        // בדיקה אם המייל כבר קיים
        Publisher.findOne({ email })
            .then((existingPublisher) => {
                if (existingPublisher) {
                    // אם המייל קיים, שולחים תשובה עם שגיאה ומפסיקים את התהליך
                    return res.status(400).send({ message: 'Email already exists!' });
                }
                // אם המייל לא קיים, מבצעים את השלב הבא של חישוב הסיסמה
                return bcrypt.hash(password, 10);
            })
            .then((hashedPassword) => {
                if (!hashedPassword) {
                    // אם משהו השתבש במהלך חישוב הסיסמה, מחזירים שגיאה
                    return res.status(500).send({ message: 'Error hashing password' });
                }
    
                // יצירת משתמש חדש
                const publisher = new Publisher({
                    email,
                    password: hashedPassword,
                    phone,
                    secondPhone
                });
    
                return publisher.save();
            })
            .then(() => {
                // שולחים תשובה עם סטטוס 201 לאחר יצירת המשתמש בהצלחה
                res.status(201).send({ message: 'Welcome to our application!' });
            })
            .catch((err) => {
                // במקרה של שגיאה כלשהי בתהליך, מחזירים תשובה עם שגיאה
                if (!res.headersSent) { // בדיקה אם כבר נשלחה תשובה
                    res.status(500).send({ error: err.message });
                }
            });
    },
    

    loginp: (req, res) => {
        // קבלת המייל והסיסמה מתוך params כמו במקור
        const email = req.params.email;
        const password = req.params.password;
        
        // חיפוש המפרסם לפי המייל
        Publisher.findOne({ email })
            .then((publisher) => {
                if (!publisher) {
                    return res.status(404).send({ message: 'Email not found!' });
                }
                
                // השוואת סיסמאות
                return bcrypt.compare(password, publisher.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            return res.status(400).send({ message: 'Email and password do not match!' });
                        }

                        // יצירת טוקן
                        const token = jwt.sign(
                            { email: publisher.email, firstName: publisher.firstName },
                            process.env.SECRET,
                            { expiresIn: '1h' }
                        );

                        res.status(200).send({ message: 'Login successful!', publisher, token });
                    });
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            });
    }
};