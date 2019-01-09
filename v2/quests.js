const { fetchComments } = require('../lib')
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
    }).select({
      _id: 0
    })

    const comments = await fetchComments(id, 'quest')

    return {
      quest,
      comments
    }
  }
}
