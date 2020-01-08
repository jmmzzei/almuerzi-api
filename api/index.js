const express = require('express')
const app = express()

app.get('*', (req, res)=> {
    console.log('on requests');
    res.send({mensaje: 'mensaje'})
})

module.exports = app