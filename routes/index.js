const comments = require('./comments')
const faq = require('./faq')
const home = require('./home')
const search = require('./search')

module.exports = (fastify, options, next) => {
  fastify.route(comments)
  fastify.route(faq)
  fastify.route(home)
  fastify.route(search)

  next()
}
