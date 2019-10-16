1. set key value # 设置key - value
2. get key # 获取key的value
3. keys * # 列出所有keys
4. del key # 删除某个key
5. 修改redis认证密码：
  1）修改port 6378 (默认6379)
  2）开启requirepass foobared => requirepass 123456(密码)
  3）$ redis-server --service-start
  4）redis-cli -p 6378
  5）auth 123456
6. setex c(key) 10(s) 1(value) # 设置过期时间