const order = require('../app/resources/order')

module.exports = {
    bind: (server) => {
        server.route('/order')
            .get(order.getOrders)
            .post(order.createOrder)
        
        server.route('/order/:id')
            .get(order.getOrderById)

        server.route('/order/:id/location').put(order.updateCurrentLocation)
    }
}
