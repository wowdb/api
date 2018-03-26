const { Achievement, Item, Quest } = require('../models')
const { results } = require('../schemas')

module.exports = {
  method: 'GET',
  schema: results,
  url: '/search',
  async handler(request) {
    const { query: { query } } = request

    const achievements = await Achievement.search(query)
    const items = await Item.search(query)
    const quests = await Quest.search(query)

    return {
      achievements,
      items,
      quests
    }
  }
}
