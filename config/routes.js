const orders = require('../app/resources/order')

module.exports = function (server) {
    server.use('/order', orders)
}
