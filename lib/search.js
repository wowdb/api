const { SEARCH_URI } = process.env

const request = require('request-promise-native')

class Search {
  async search(query) {
    try {
      const data = await request({
        json: true,
        uri: `${SEARCH_URI}/search?query=${encodeURIComponent(query)}`
      })

      return data
    } catch (error) {
      return []
    }
  }

  async lookup(body) {
    try {
      const data = await request({
        body,
        json: true,
        method: 'post',
        uri: `${SEARCH_URI}/lookup`
      })

      return data
    } catch (error) {
      return []
    }
  }
}

module.exports = new Search()
