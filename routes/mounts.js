const { Comments } = require('../lib')
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
    })

    const comments = await Comments.fetch(id, 'spell')

    return {
      mount,
      comments
    }
  }
}
