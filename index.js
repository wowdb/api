const { MONGO_URI, MONGO_DB, PORT } = process.env

const cors = require('cors')
const fastify = require('fastify')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(
  MONGO_URI,
  {
    autoIndex: false,
    dbName: MONGO_DB,
    useNewUrlParser: true
  }
)

const server = fastify()

server.use(cors())

const v1 = require('./v1')
const v2 = require('./v2')

server.register(v1)
server.register(v2, {
  prefix: 'v2'
})

server.listen(PORT, '0.0.0.0', err => {
  if (err) {
    throw err
  }
})

module.exports = server
