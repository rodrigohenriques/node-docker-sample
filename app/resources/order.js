const express = require('express');
const router = express.Router();
const Order = require('../models/order')

router.get('/', getOrders)

router.post('/', createOrder)

router.put('/:uuid/location', updateOrderLocation)

router.get('/:uuid', getOrderById)

async function getOrders(req, res) {
    let orders = await Order.find({}).exec()
    res.status(200).json(orders)
}

function createOrder(req, res) {
    let body = req.body

    if (body && body.destination) {
        let newOrder = new Order()

        newOrder.destination = body.destination
        newOrder.currentLocation = body.current_location

        newOrder.save()

        return res.status(201).json(newOrder)
    }

    return res.status(500).json({ message: "You must specify a destination for a new order" })
}

async function updateOrderLocation(req, res) {
    let id = req.params.uuid

    let order = await Order.findOne({ _id: id }).exec()

    if (order == undefined) {
        return res.status(500).json({ message: "This order can't be found" })
    }

    if (req.body && req.body.lat && req.body.lng) {
        order.currentLocation.lat = req.body.lat
        order.currentLocation.lng = req.body.lng
        order.save()
        res.status(200).json(order)
    } else {
        res.status(500).json({ message: "You must pass the new current location to update that order" })
    }
}

async function getOrderById(req, res) {
    let id = req.params.uuid
    let order = await Order.findOne({ _id: id }).exec()
    
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(500).json({ message: "This order can't be found" })
    }

}

module.exports = router;