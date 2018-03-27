const { fetchComments } = require('../lib')
const { comments } = require('../schemas')

module.exports = {
  method: 'GET',
  url: '/comments/:type/:id',
  schema: comments,
  async handler(request, reply) {
    const { params: { id, type } } = request

    const comments = await fetchComments(id, type)

    return {
      comments
    }
  }
}
