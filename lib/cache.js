const { REDIS_URI } = process.env

const { promisify } = require('util')

const redis = require('redis')

class Cache {
  constructor() {
    const client = redis.createClient(REDIS_URI)

    this.getAsync = promisify(client.get).bind(client)
    this.setAsync = promisify(client.set).bind(client)
  }

  async get(key) {
    const data = await this.getAsync(key)

    return JSON.parse(data)
  }

  async set(key, value) {
    const data = JSON.stringify(value)

    await this.setAsync(key, data, 'EX', 60 * 60)
  }
}

module.exports = new Cache()
