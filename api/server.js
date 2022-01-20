const express = require("express")

const server = express()

const carsRouter = require('./cars/cars-router')

server.use(express.json())

server.use('/api/cars', carsRouter)

// DO YOUR MAGIC

module.exports = server
