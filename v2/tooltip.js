const { fetchTooltip } = require('../lib')

module.exports = {
  method: 'GET',
  url: '/tooltip/:type/:id',
  async handler(request, reply) {
    const {
      params: { id, type }
    } = request

    const tooltip = await fetchTooltip(id, type)

    reply.type('text/html').send(tooltip)
  }
}
