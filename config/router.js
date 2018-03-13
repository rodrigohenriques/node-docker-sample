const orders = require('../app/resources/order')

module.exports = {
    bind: (server) => {
        server.use('/order', orders)
    }
}
