const fs = require('fs')
const path = require('path')
const util = require('util')

const request = require('request-promise-native')

const cache = require('./cache')

const readFile = util.promisify(fs.readFile)

const download = async (id, type) => {
  const uri = `https://www.wowhead.com/tooltip/${type}/${id}&json&power`

  const { tooltip_enus } = await request(uri, {
    json: true
  })

  return tooltip_enus
}

const compile = async tooltip => {
  const file = path.resolve(__dirname, '..', 'templates', 'tooltip.html')

  const template = await readFile(file, 'utf8')

  return template.replace('{{{tooltip}}}', tooltip)
}

module.exports = async (id, type) => {
  const key = `tooltip_${type}_${id}`

  let data = await cache.get(key)

  if (!data) {
    const tooltip = await download(id, type)

    data = await compile(tooltip)

    await cache.set(key, data)
  }

  return data
}
