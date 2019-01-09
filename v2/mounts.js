const { fetchComments } = require('../lib')
const { Mount } = require('../models')

module.exports = {
  method: 'GET',
  url: '/mounts/:id',
  async handler(request) {
    const {
      params: { id }
    } = request

    const mount = await Mount.findOne({
      spellId: id
    }).select({
      _id: 0
    })

    const comments = await fetchComments(id, 'spell')

    return {
      mount,
      comments
    }
  }
}
