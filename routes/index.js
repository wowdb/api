const home = require('./home')
const search = require('./search')

module.exports = (fastify, options, next) => {
  fastify.route(home)
  fastify.route(search)

  next()
}
