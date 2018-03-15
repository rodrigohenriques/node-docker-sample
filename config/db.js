const mongoose = require('mongoose')

var dbURL = process.env.MONGODB_URI || "mongodb://mongo:27017"

if (process.env.NODE_ENV === "test") {
    dbURL = "mongodb://mongo:27017/test"
}

//DB setup
mongoose.connection.on('connected', function () {
    console.log("Mongoose default connection is open to ", dbURL);
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
    });
});

module.exports = {
    connect: () => {
        mongoose.connect(dbURL)
        return mongoose.connection
    }
}
