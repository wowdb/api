const { MONGO_URI, MONGO_DB, NODE_ENV, PORT } = process.env

const cors = require('cors')()
const fastify = require('fastify')()
const mongoose = require('mongoose')

mongoose.connect(MONGO_URI, {
  dbName: MONGO_DB
})
mongoose.Promise = global.Promise

fastify.use(cors)

const v1 = require('./v1')

fastify.register(v1)

fastify.listen(PORT, '0.0.0.0', err => {
  if (err) {
    throw err
  }

  console.log(`server listening on ${fastify.server.address().port}`)
})

module.exports = fastify
