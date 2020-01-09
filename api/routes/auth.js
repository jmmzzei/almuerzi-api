const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const crypto = require('crypto')

router.post('/register', (req, res) => {
    res.send('register')
    const { email, password } = req.body
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const newPassword = key.toString('base64')
            Users.findOne({ email })
                .exec()
                .then(user => {
                    if (user) {
                        return res.send('User already exists')
                    }
                    Users.create({
                        email,
                        password: newPassword,
                        salt: newSalt
                    }).then(() => {
                        res.send('User succesfully created')
                    })
                })
        })
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    Users.findOne({ email })
        .exec()
        .then(user => {
            if (!user) {
                // return res.send('User and/or password doesn\'t match')
                return res.send('User doesn\'t exists')
            }
            crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                const newPassword = key.toString('base64')
                if (user.password === newPassword) {
                    const token = singToken(user._id)
                    alert('Signed')
                    return res.send({token})
                }
                return res.send('User and/or password doesn\' match')
            })
        })
})


module.exports = router
