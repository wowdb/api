const { Achievement, Item, Quest } = require('../models')
const { results } = require('../schemas')

module.exports = {
  method: 'GET',
  schema: results,
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
