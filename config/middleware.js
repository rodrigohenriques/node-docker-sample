function logger(req, res, next) {
    console.log('Request: ', req.method + " -> " + req.hostname + req.url)
    console.log('Headers: ', req.headers)
    console.log('Body: ', req.body)
    console.log()
    next()
}

function handleError(err, req, res, next) {
    console.log(err.stack)

    let errorBody = {
        message: err.message,
        stack: err.stack
    }

    res.status(err.status || 500).json(errorBody)
}

module.exports = {
    bind: (server) => {
        server.use('/*', logger)
        server.use(handleError)
    }
}
