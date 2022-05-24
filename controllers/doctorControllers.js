const db = require('../db/db')
const bcrypt = require('bcryptjs')
const sharp = require('sharp')
const validator = require('validator');

const registerPatient = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    if (name.trim().length < 3) {
        return res.json({ status: "error", error: "Name should be atleast 3 characters long!" })
    }
    if (address.trim().length < 10) {
        return res.json({ status: "error", error: "Address should be more than 10 characters long!" })
    }
    if (!validator.isEmail(email)) {
        return res.json({ status: "error", error: "Email invalid!" })
    }
    if (!validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0
    })) {
        return res.json({ status: "error", error: "Weak Password!" })
    }
    if (password.trim().length > 15) {
        return res.json({ status: "error", error: "Password should be less than 15 characters!" })
    }
    if (phone) {
        if (phone.trim().length !== 10) {
            return res.json({ status: "error", error: "Invalid phone number!" })
        }
    }
    const buffer = await sharp(req.file.buffer).png().resize({ width: 250, height: 250 }).toBuffer()
    if (!name || !email || !password) return res.json({ status: "error", error: "Please fill all mandatory fields" })
    else {
        db.query('SELECT Email FROM Patients WHERE Email = ?', [email], async (err, ress) => {
            if (err) throw err;
            if (ress[0]) return res.json({ status: "error", error: "Email has already been taken!" })
            else {
                const encpassword = await bcrypt.hash(password, 10)
                db.query('INSERT INTO Patients SET ?', { 'Name': name, 'Email': email, 'Password': encpassword, 'Phone Number': phone, 'Address': address, 'Patient Photo': buffer, 'Doctor Email': req.user.Email }, (error, result) => {
                    if (error) throw error;
                    return res.json({ status: "success", success: "Patient registered!" })
                })

            }
        })
    }
}


const myprofile = async (req, res) => {
    return res.json({ status: "success", user: req.user });
}

const patientCount = async (req, res) => {
    db.query('SELECT psychiatrists.`First Name` , psychiatrists.`Hospital Name`, COUNT(*) AS `No of Patients` from psychiatrists JOIN Patients ON psychiatrists.Email = Patients.`Doctor Email` GROUP BY 1;', (err, result) => {
        if (err) return res.json({ status: "error", error: "Something went wrong!" })
        res.json({ status: "success", data: result })
    })

}

const allPatients = (req, res) => {
    db.query('SELECT Name,Address,Email,Password,`Phone Number` FROM Patients', (err, result) => {
        if (err) return res.json({ status: "error", error: "Something went wrong!" })
        res.json({ status: "success", data: result })
    })
}

const patientsByDoctor = (req, res) => {

    db.query('SELECT Name,Address,Email,Password,`Phone Number` FROM Patients WHERE `Doctor Email`=?', [req.user.Email], (err, result) => {
        if (err) return res.json({ status: "error", error: "Something went wrong!" })
        res.json({ status: "success", data: result })
    })
}

module.exports = { myprofile, registerPatient, patientCount, allPatients, patientsByDoctor };