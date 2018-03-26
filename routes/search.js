const Achievement = require('../models/achievement')
const Item = require('../models/item')
const Quest = require('../models/quest')

const { search } = require('../schemas')

const index = {
  method: 'GET',
  schema: search,
  url: '/search',
  async handler(request) {
    const { query: { q } } = request

    const achievements = await Achievement.search(q)
    const items = await Item.search(q)
    const quests = await Quest.search(q)

    return {
      achievements,
      items,
      quests
    }
  }
}

module.exports = (fastify, opts, next) => {
  fastify.route(index)

  next()
}
