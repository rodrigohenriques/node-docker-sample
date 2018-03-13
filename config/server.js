const db = require('./db')
const express = require('express')
const router = require('./router')
const middleware = require('./middleware')

const server = express()

middleware.bind(server)
router.bind(server)

server.use('*', function (req, res) {
    res.status(404)
    res.send()
})

db.connect()

server.listen(8080, () => console.log('Example app listening on port 8080!'))
