const express = require('express')
const mongoose = require('mongoose')
const configureRoutes = require('./routes') 

//DB setup
mongoose.connect("mongodb://mongo:27017");

const server = express()

server.get('/', (req, res) => res.send('Hello World!'))

configureRoutes(server)

server.listen(8080, () => console.log('Example app listening on port 8080!'))
