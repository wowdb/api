const { Comments } = require('../lib')
const { Achievement } = require('../models')

module.exports = {
  method: 'GET',
  url: '/achievements/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const achievement = await Achievement.findOne({
      id
    })

    const comments = await Comments.fetch(id, 'achievement')

    return {
      achievement,
      comments
    }
  }
}
