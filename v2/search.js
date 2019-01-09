const { search } = require('../lib')
const { results } = require('../schemas')

module.exports = {
  method: 'GET',
  schema: results,
  url: '/search',
  async handler(request) {
    const {
      query: { query }
    } = request

    const results = await search.search(query)

    return {
      results
    }
  }
}
