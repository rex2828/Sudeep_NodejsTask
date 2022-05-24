const db = require('../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator');

const registerDoctor = async (req, res) => {
    const { fName, lName, email, password, hospitalName, phone, pincode, state } = req.body;
    if (fName.trim().length > 20) {
        return res.json({ status: "error", error: "First name should be less than 20 characters!" })
    }
    if (lName.trim().length > 20) {
        return res.json({ status: "error", error: "Last name should be less than 20 characters!" })
    }
    if (!validator.isEmail(email)) {
        return res.json({ status: "error", error: "Email invalid!" })
    }
    if (!validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0
    })) {
        return res.json({ status: "error", error: "Weak Password!" })
    }
    if (phone) {
        if (phone.trim().length !== 10) {
            return res.json({ status: "error", error: "Invalid phone number!" })
        }
    }
    if (!fName || !lName || !hospitalName || !email || !password) return res.json({ status: "error", error: "Please fill all mandatory fields" })
    else {
        db.query('SELECT Email FROM psychiatrists WHERE Email = ?', [email], async (err, ress) => {
            if (err) throw err;
            if (ress[0]) return res.json({ status: "error", error: "Email has already been taken!" })
            else {
                const encpassword = await bcrypt.hash(password, 10)
                db.query('INSERT INTO psychiatrists SET ?', { 'First Name': fName, 'Last Name': lName, 'Email': email, 'Password': encpassword, 'Hospital Name': hospitalName, 'Phone Number': phone, 'Pincode': pincode, 'State': state }, (error, result) => {
                    if (error) throw error;
                    const token = jwt.sign({ email: email }, process.env.JWT_SECRET)
                    return res.json({ status: "success", token: token, success: "Doctor registered!" })
                })

            }
        })
    }
}

const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "Please fill your email and password" })
    else {
        db.query('SELECT * FROM psychiatrists where Email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (!result[0] || !await bcrypt.compare(password, result[0].Password)) return res.json({ status: "error", error: "Invalid email or password!" })
            else {
                const token = jwt.sign({ email }, process.env.JWT_SECRET)

                return res.json({ status: "success", token: token, success: "User logged In!" })
            }
        })
    }
}


module.exports = { registerDoctor, loginDoctor }