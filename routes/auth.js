const express = require('express')
const router = express.Router()
const { registerDoctor, loginDoctor } = require('../controllers/authControllers.js')
router.post('/registerDoctor', registerDoctor)
router.post('/loginDoctor', loginDoctor)
module.exports = router;