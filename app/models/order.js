const mongoose = require('mongoose')

var orderSchema = new mongoose.Schema({
    destination: {
        lat: Number,
        long: Number
    },
    status: String,
    //driverId: Schema.Types.ObjectId,
    currentLocation: {
        lat: Number,
        long: Number
    }
});

module.exports = mongoose.model('Order', orderSchema)