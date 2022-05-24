const express = require('express')
const router = express.Router()
const multer = require('multer')
const { auth } = require('../middleware/auth');
const { myprofile, registerPatient, patientCount, allPatients, patientsByDoctor } = require('../controllers/doctorControllers')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/registerPatient', auth, upload.single('avatar'), registerPatient);
router.get('/me', auth, myprofile);
router.get('/getPatientCount', patientCount);
router.get('/getAllPatients', allPatients);
router.get('/getPatientsByDoctor', auth, patientsByDoctor);
module.exports = router;