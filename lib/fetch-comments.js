const fetch = require('node-fetch')

const cache = require('./cache')

const create = async (id, type) => {
  const response = await fetch(`https://www.wowhead.com/${type}=${id}`)

  const data = await response.text()

  const index = data.indexOf('lv_comments0')

  const line = data.substring(0, index).split('\n').length - 1

  const comments = data
    .split('\n')
    [line].substr('var lv_comments0 = '.length)
    .trim()
    .slice(0, -1)

  return eval(comments)
}

module.exports = async (id, type) => {
  const key = `${type}_${id}`

  let data = await cache.get(key)

  if (!data) {
    data = await create(id, type)

    await cache.set(key, data)
  }

  return data
}
