const Order = require('../models/order')
const Pusher = require('../../service/Pusher')

async function getOrders(req, res) {
    try {
        let orders = await Order.find({}).exec()
        res.status(200).json(orders)
    } catch (err) {
        res.send(err)
    }
}

function createOrder(req, res) {
    try {
        let body = req.body

        if (body && body.destination) {
            let newOrder = new Order()

            newOrder.destination = body.destination
            newOrder.currentLocation = body.current_location
            newOrder.state = "idle"

            newOrder.save()

            Pusher.trigger('order', newOrder._id, newOrder);

            return res.status(201).json(newOrder)
        }

        return res.status(500).json({ message: "You must specify a destination for a new order" })
    } catch (err) {
        res.send(err)
    }
}

async function updateCurrentLocation(req, res) {
    try {
        let order = await Order.findOne({ _id: req.params.id }).exec()

        if (order == undefined) {
            return res.status(500).json({ message: "This order can't be found" })
        }

        if (req.body && req.body.lat && req.body.lng) {
            order.currentLocation.lat = req.body.lat
            order.currentLocation.lng = req.body.lng
            
            let distance = order.distance()

            if (distance <= 10) {
                order.state = "delivered"
            } else {
                order.state = "ongoing"
            }

            order.save()

            Pusher.trigger('order-stream', order._id, order);

            res.status(200).json(order)
        } else {
            res.status(500).json({ message: "You must pass the new current location to update that order" })
        }
    } catch (err) {
        res.send(err)
    }
}

async function getOrderById(req, res) {
    try {
        let order = await Order.findOne({ _id: req.params.id }).exec()

        if (order) {
            res.status(200).json(order)
        } else {
            res.status(500).json({ message: "This order can't be found" })
        }
    } catch (err) {
        res.send(err)
    }
}

module.exports = { getOrders, createOrder, updateCurrentLocation, getOrderById };