const request = require('request-promise-native')

const BBCode = require('./bbcode')
const Cache = require('./cache')

class Comments {
  async fetch(id, type) {
    const key = `comments_${type}_${id}`

    const data = await Cache.get(key)

    if (data) {
      return data
    }

    const fresh = await this.download(id, type)

    await Cache.set(key, fresh)

    return fresh
  }

  async download(id, type) {
    const uri = `https://www.wowhead.com/${type}=${id}`

    const response = await request(uri)

    const index = response.indexOf('lv_comments0')

    if (index < 0) {
      return []
    }

    const line = response.substring(0, index).split('\n').length - 1

    const data = response
      .split('\n')
      [line].substr('var lv_comments0 = '.length)
      .trim()
      .slice(0, -1)
      .replace(/creationdate/g, 'date')
      .replace(/username/g, 'user')

    const comments = eval(data)

    return comments.map(({ id, body, user, rating, date, replies }) => {
      return {
        id,
        user,
        rating,
        date,
        body: BBCode.parse(body),
        replies: replies.map(({ id, body, user, rating, date }) => ({
          id,
          user,
          rating,
          date,
          body: BBCode.parse(body)
        }))
      }
    })
  }
}

module.exports = new Comments()
