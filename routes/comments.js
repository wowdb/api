const { fetchComments } = require('../lib')

module.exports = {
  method: 'GET',
  url: '/comments/:type/:id',
  async handler(request, reply) {
    const { params: { id, type } } = request

    const comments = await fetchComments(id, type)

    return {
      comments
    }
  }
}
