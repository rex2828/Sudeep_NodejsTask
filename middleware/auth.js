const db = require('../db/db')
const jwt = require('jsonwebtoken')
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        db.query('SELECT * FROM psychiatrists WHERE Email = ?', [decoded.email], (err, result) => {
            if (err) return res.json({ status: "error", error: "Something went wrong!" });
            req.user = result[0]
            next()
        })
    } catch (err) {
        res.send({ status: "error", error: "Not authorised!" })
    }

}

module.exports = { auth }