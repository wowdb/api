const fetch = require('node-fetch')

const cache = require('./cache')

const download = async (id, type) => {
  const uri = `https://www.wowhead.com/${type}=${id}`

  console.log('comments', uri)

  const response = await fetch(uri)

  const text = await response.text()

  const index = text.indexOf('lv_comments0')

  if (index < 0) {
    return []
  }

  const line = text.substring(0, index).split('\n').length - 1

  const data = text
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
  const key = `${type}_${id}`

  let data = await cache.get(key)

  if (!data) {
    data = await download(id, type)

    await cache.set(key, data)
  }

  return data
}
