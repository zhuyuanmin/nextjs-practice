function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }
  // 获取Redis中存储的session数据
  async get(sid) {
    console.log('get session id:', sid)
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  // 设置Redis中存储的session
  async set(sid, sess, ttl) {
    console.log('set session id:', sid)
    const id = getRedisSessionId(sid)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    try {
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // 删除Redis中存储的session数据
  async destroy(sid) {
    const id = getRedisSessionId(sid)
    await this.client.del(id)
  }
}

module.exports = {
  RedisSessionStore
}