var express = require('express');
var router = express.Router();

router.get('/', getOrders)

router.get('/ongoing', getOngoingOrders)

router.get('/available', getAvailableOrders)

router.post('/', createOrder)

router.patch('/:orderId', updateOrder)

router.delete('/:orderId', deleteOrder)

router.get('/:orderId', getOrderById)

function getOrders(req, res) {
    res.send('It should return the order list');
}

function getOngoingOrders(req, res) {
    res.send('It should return only the ongoing orders');
}

function getAvailableOrders(req, res) {
    res.send('It should return onyl the available orders');
}

function createOrder(req, res) {
    res.send('It should create an order');
}

function updateOrder(req, res) {
    let id = req.params.orderId
    res.send('It should update the specified order: ' + id);
}

function deleteOrder(req, res) {
    let id = req.params.orderId
    res.send('It should delete the specified order: ' + id);
}

function getOrderById(req, res) {
    let id = req.params.orderId
    res.send('It should return data from order with id ' + id)
}

module.exports = router;