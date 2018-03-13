const express = require('express');
const router = express.Router();
const Order = require('../models/order') 

router.get('/', getOrders)

router.get('/ongoing', getOngoingOrders)

router.get('/available', getAvailableOrders)

router.post('/', createOrder)

router.patch('/:orderId', updateOrder)

router.delete('/:orderId', deleteOrder)

router.get('/:orderId', getOrderById)

function getOrders(req, res) {
    Order.find().exec(function (err, orders) {
        if (err) throw err;

        res.status(200).json(orders)
    })
}

function getOngoingOrders(req, res) {
    res.send('It should return only the ongoing orders');
}

function getAvailableOrders(req, res) {
    res.send('It should return onyl the available orders');
}

function createOrder(req, res) {
    let body = req.body
    
    console.log('>>>>>> Body: ', body)

    let newOrder = new Order()

    newOrder.destination = {
        lat: 123,
        long: 123
    }

    newOrder.status = "idle"

    newOrder.save(function (err) {
        if (err) throw err;

        res.status(201).json(newOrder)
    })
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