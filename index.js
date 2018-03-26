const { MONGO_URI, NODE_ENV, PORT } = process.env

const cors = require('cors')()
const fastify = require('fastify')()
const mongoose = require('mongoose')

mongoose.connect(MONGO_URI)
mongoose.Promise = global.Promise

fastify.use(cors)

const index = require('./routes/index')
const search = require('./routes/search')

fastify.register(index)
fastify.register(search)

fastify.listen(PORT, '0.0.0.0', err => {
  if (err) {
    throw err
  }

  console.log(`server listening on ${fastify.server.address().port}`)
})

module.exports = fastify
