const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const geolib = require('geolib')

var orderSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv1 },
    destination: {
        lat: Number,
        lng: Number
    },
    currentLocation: {
        lat: Number,
        lng: Number
    },
    state: { type: String, required: true }
});

orderSchema.methods.distance = function() {
    let distance = geolib.getDistance(
        { latitude: this.currentLocation.lat, longitude: this.currentLocation.lng}, 
        { latitude: this.destination.lat, longitude: this.destination.lng}
    )
    return distance
}

orderSchema.methods.toJSON = function() {
    var obj = this.toObject()
    
    obj.id = obj._id
    obj.current_location = obj.currentLocation
    
    delete obj._id
    delete obj.currentLocation
    delete obj.__v
    
    return obj
}

module.exports = mongoose.model('Order', orderSchema)