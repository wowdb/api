const { SEARCH_URI } = process.env

const request = require('request-promise-native')

class Search {
  async search(query) {
    try {
      const data = await request({
        uri: `${SEARCH_URI}?query=${encodeURIComponent(query)}`,
        json: true
      })

      return data
    } catch (error) {
      return []
    }
  }
}

module.exports = new Search()
