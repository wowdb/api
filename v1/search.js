const {
  Achievement,
  Boss,
  Item,
  Mount,
  Pet,
  Quest,
  Zone
} = require('../models')
const { results } = require('../schemas')

module.exports = {
  method: 'GET',
  schema: results,
  url: '/search',
  async handler(request) {
    const {
      query: { query }
    } = request

    const achievements = await Achievement.search(query)
    const items = await Item.search(query)
    const mounts = await Mount.search(query)
    const npcs = await Boss.search(query)
    const pets = await Pet.search(query)
    const quests = await Quest.search(query)
    const zones = await Zone.search(query)

    return {
      achievements,
      items,
      mounts,
      npcs,
      pets,
      quests,
      zones
    }
  }
}
