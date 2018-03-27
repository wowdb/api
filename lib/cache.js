const { REDIS_URL } = process.env

const { promisify } = require('util')

const redis = require('redis')

const client = redis.createClient(REDIS_URL)

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

module.exports = {
  async get(key) {
    const data = await getAsync(key)

    return JSON.parse(data)
  },
  async set(key, value) {
    const data = JSON.stringify(value)

    await setAsync(key, data, 'EX', 60)
  }
}
