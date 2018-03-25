const Item = require('../models/item')

const schemas = require('../schemas')

const search = {
  method: 'GET',
  schema: schemas.items,
  url: '/search',
  async handler(request) {
    const { query: { q } } = request

    const items = await Item.search(q)

    return {
      items
    }
  }
}

module.exports = (fastify, opts, next) => {
  fastify.route(search)

  next()
}
