const { Comments } = require('../lib')
const { Quest } = require('../models')

module.exports = {
  method: 'GET',
  url: '/quests/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const quest = await Quest.findOne({
      id
    })

    const comments = await Comments.fetch(id, 'quest')

    return {
      quest,
      comments
    }
  }
}
