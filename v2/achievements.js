const { fetchComments } = require('../lib')
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
    }).select({
      _id: 0
    })

    const comments = await fetchComments(id, 'achievement')

    return {
      achievement,
      comments
    }
  }
}
