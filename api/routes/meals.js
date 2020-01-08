const express = require('express')
const router = express.Router()
const Meals = require('../models/Meals')

router.get('/', (req,res)=> {
    Meals.find()
    .exec()
    .then(x => {
        res.status(200).send(x)
    })
})

router.get('/:id', (req, res)=> {    
    Meals.findById(req.params.id)
    .exec()
    .then(x => {
        res.send(x)
    })
})

router.post('/', (req, res)=> {
    Meals.create(req.body)
    .then(x => {
        res.send(x)
    })
})

router.put('/:id', (req, res)=> {
    Meals.findByIdAndUpdate(req.params.id, req.body)
    .then(x => {
        res.send(x)
    })
})

router.delete('/:id', (req, res)=> {

    Meals.findOneAndDelete(req.params.id)
    .exec()
    .find( x => {
        res.sendStatus(204)
    })
})

module.exports = router
