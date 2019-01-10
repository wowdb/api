const request = require('request-promise-native')

const cache = require('./cache')

const download = async (id, type) => {
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
      body,
      user,
      rating,
      date,
      replies: replies.map(({ id, body, user, rating, date }) => ({
        id,
        body,
        user,
        rating,
        date
      }))
    }
  })
}

module.exports = async (id, type) => {
  const key = `comments_${type}_${id}`

  let data = await cache.get(key)

  if (!data) {
    data = await download(id, type)

    await cache.set(key, data)
  }

  return data
}
