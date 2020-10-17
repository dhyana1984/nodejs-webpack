const redis = require('redis')
//创建redis客户端
const client = redis.createClient()

client.on('error', (err) => {
  console.log('Error', err)
})

client.set('string key', 'string val', redis.print)
client.hset(
  'hash key', //set name
  'hashtest 1', //set propname
  'some value', //set propkey
  'anotherProp', //set propname
  'anotherValue', //set propkey
  redis.print
)
client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)
client.hkeys('hash key', (err, replies) => {
  replies.forEach((reply, i) => {
    console.log(' ', i, ':', reply)
  })
  client.quit()
})
