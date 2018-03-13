const express = require('express')
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const router = require('./router')
const db = require('./db')

const server = express()

server.use(bodyParser.json())

middleware.bind(server)
router.bind(server)

server.listen(8080, () => console.log('Example app listening on port 8080!'))

db.connect()
