const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

require('dotenv').config()
app.set('port', 3000)
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const router = express.Router()

app.use('/api/meals', require('./routes/meals'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/auth', require('./routes/auth'))

app.get('*', (req, res) => {
    // Users.find()
    //     .then(x => res.send(x))
    res.send('all routes')
})

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})

module.exports = app