const Client = require("../models/client")
// התקנת הספריה - jsonwebtoken
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
   

    registerc: (req, res) => {

        const  email=req.params.email, password=req.params.password

        Client.find({ email: { $eq: email } })
            .then((clients) => {
                if (clients && clients.length > 0) {
                    res.status(404).send({ message: `email has been exists already!` })
                }
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).send({ error: error.message })
                    }
                const client = new Client({
                    email,
                    password:hash,
                   
                    
                })
                return client.save()
            })
                })
            .then((client) => {
                res.status(200).send({ message: `welcome to our application!` })
            })
            .catch((err) => {
                res.status(500).send({ error: err.message })
            })
    },

    // jwt
    // json web token
    loginc: (req, res) => {

        const  email=req.params.email, password=req.params.password
        Client.find({ email: { $eq: email } })
            .then((clients) => {

                // const user = users[0]
                const [client] = clients

                if (!client) {
                return    res.status(404).send({ message: `email and password are not match!` })
                }

                if (client.password != password) {
                return    res.status(404).send({ message: `email and password are not matches!` })
                }
                // token - שליחת מחרוזת
                // jwt.sign - יצירת מחרוזת האבטחה
                // מקבלת שלשה ארגומנטים
                // 1. אובייקט שיכיל את המאיינים שלפיהם ניצור את המחרוזת
                // 2. מחרוזת ייחודית למערכת שתצטרף לנ"ל
                // 3. אובייקט אפשרויות
                // הראנו דוגמה של הגדרת תוקף למחרוזת - עד שעה...
                const token = jwt.sign({ email, firstName: user.firstName }, process.env.SECRET, {
                    // תוקף למחרוזת האבטחה
                    expiresIn: '1hr' // hours
                    // expiresIn:'1d' // days
                    // expiresIn:'1s' // seconds
                    // expiresIn:'1m' // minutes
                    // expiresIn:'1' // miliseconds
                })

                res.status(200).send({ message: `login successfuly!`, user, token })
            }
            )
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    }
}
