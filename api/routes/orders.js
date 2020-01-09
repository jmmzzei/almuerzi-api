const express = require('express')
const router = express.Router()
const Orders = require('../models/Orders')
const { isAuthenticated, hasRoles } = require('../auth/index')

router.get('/', (req, res) => {
    Orders.find()
        .exec()
        .then(x => {
            res.status(200).send(x)
        })
})

router.get('/:id', (req, res) => {
    Orders.findById(req.params.id)
        .exec()
        .then(x => {
            res.send(x)
        })
})

//first authentication and later authorization by role (can acces users and admins)
router.post('/', isAuthenticated, hasRoles(['admin','user']), (req, res) => {
    const { _id } = req.user
    Orders.create({ ...req.body, user_id: _id })
        .then(x => {
            res.status(201).send(x)
        })
})

router.put('/:id', isAuthenticated, (req, res) => {
    Orders.findByIdAndUpdate(req.params.id, req.body)
        .then(x => {
            res.send(x)
        })
})

router.delete('/:id', isAuthenticated, (req, res) => {

    Orders.findOneAndDelete(req.params.id)
        .exec()
        .find(x => {
            res.sendStatus(204)
        })
})


module.exports = router
