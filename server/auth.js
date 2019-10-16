const axios = require('axios')
const { token_uri, client_id, client_secret } = require('../config').github

module.exports = (server) => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: token_uri,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })
      if (result.status === 200 && !result.data.error) {
        ctx.session.gethubAuth = result.data
        const { token_type, access_token } =  result.data
        const userInfo = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        })
        ctx.session.userInfo = userInfo.data
        ctx.redirect('/')
      } else {
        ctx.body = `Request token failed ${result.message}`
      }
    } else {
      await next()
    }
  })
}