const { Comments } = require('../lib')
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
    })

    const comments = await Comments.fetch(id, 'npc')

    return {
      boss,
      comments
    }
  }
}
