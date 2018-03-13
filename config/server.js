const express = require('express')
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const router = require('./router')
const db = require('./db')

let connection = db.connect()

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function () {
    var port = process.env.PORT || 8080;

    const server = express()

    server.use(bodyParser.json())
    
    middleware.bind(server)
    router.bind(server)

    server.listen(port, function() {
        console.log('Magic happens on port ' + port);
    });
});