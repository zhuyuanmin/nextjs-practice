async function test() {
  const Redis = require('ioredis')

  const redis = new Redis({
    port: 6378,
    host: '127.0.0.1',
    password: '123456'
  })

  const keys = await redis.keys('*')
  await redis.setex('xxx', 100, 'xyz')
  await redis.set('a', 987)
  await redis.get('b')
  console.log(keys)
}
test()