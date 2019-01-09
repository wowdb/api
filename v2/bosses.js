const { fetchComments } = require('../lib')
const { Boss } = require('../models')

module.exports = {
  method: 'GET',
  url: '/bosses/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const boss = await Boss.findOne({
      id
    }).select({
      _id: 0
    })

    const comments = await fetchComments(id, 'npc')

    return {
      boss,
      comments
    }
  }
}
