const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
const db = require('./db')

let connection = db.connect()

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function () {
    const server = express()

    server.use(bodyParser.json())
    server.use(morgan('combined'))
    server.use(handleError)
    
    router.bind(server)

    var port = process.env.PORT || 8080;

    server.listen(port, () => console.log('Magic happens on port ' + port))
});

function handleError(err, req, res, next) {
    console.log(err.stack)

    let errorBody = {
        message: err.message,
        stack: err.stack
    }

    res.status(err.status || 500).json(errorBody)
}