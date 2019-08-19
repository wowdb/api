const { MONGO_URI, MONGO_DB, PORT } = process.env

const cors = require('cors')
const fastify = require('fastify')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, {
  autoIndex: false,
  dbName: MONGO_DB,
  useNewUrlParser: true
})

const server = fastify()

server.use(cors())

const routes = require('./routes')

server.register(routes, {
  prefix: 'v1'
})

server.listen(PORT, err => {
  if (err) {
    throw err
  }
})

module.exports = server
