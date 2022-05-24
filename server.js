const express = require('express')
const db = require('./db/db')

const app = express()
require('dotenv').config()
const cookie = require('cookie-parser')
const PORT = process.env.PORT || 5000

db.connect((err) => {
    if (err) throw err;
})

app.use(cookie());
app.use(express.json())
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/doctorRoutes'))

app.listen(PORT)