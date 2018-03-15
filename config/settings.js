
var port = process.env.PORT || 8080
var dbURL = process.env.MONGODB_URI || "mongodb://mongo:27017"

module.exports = {
    dbURL: dbURL,
    port: port
}