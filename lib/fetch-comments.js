const fetch = require('node-fetch')

const cache = require('./cache')

const download = async (id, type) => {
  const uri = `https://www.wowhead.com/${type}=${id}`

  console.log('comments', uri)

  const response = await fetch(uri)

  const data = await response.text()

  const index = data.indexOf('lv_comments0')

  if (index < 0) {
    return []
  }

  const line = data.substring(0, index).split('\n').length - 1

  const comments = data
    .split('\n')
    [line].substr('var lv_comments0 = '.length)
    .trim()
    .slice(0, -1)
    .replace(/creationdate/g, 'date')
    .replace(/username/g, 'user')

  return eval(comments)
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
