module.exports = {
  method: 'GET',
  url: '/',
  handler(request, reply) {
    reply.redirect('https://designplox.com/bigglesworth/')
  }
}
