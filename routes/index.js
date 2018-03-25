const index = {
  method: 'GET',
  url: '/',
  handler(request, reply) {
    reply.redirect('https://designplox.com/bigglesworth/')
  }
}

module.exports = (fastify, opts, next) => {
  fastify.route(index)

  next()
}
