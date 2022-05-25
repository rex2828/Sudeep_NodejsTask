const express = require('express')
const db = require('./db/db')

const app = express()
require('dotenv').config()
const cookie = require('cookie-parser')
const PORT = process.env.PORT

db.connect((err, result) => {
    if (err) throw err;
})

app.use(cookie());
app.use(express.json())
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/doctorRoutes'))

app.listen(PORT)