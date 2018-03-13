const mongoose = require('mongoose')

const dbURL = process.env.MONGODB_URI || "mongodb://mongo:27017"

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
