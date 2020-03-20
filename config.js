const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = '1c2dd595ed14f502cce7'

module.exports = {
  github: {
    app_name: 'handsome',
    github_oAuth_url: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
    token_uri: 'https://github.com/login/oauth/access_token',
    client_id,
    client_secret: 'ae84b32b72372e05ceec41f0f8ba99b8bf3c6c6a'
  }
}

// [Github授权 GET] https://github.com/login/oauth/authorize?client_id=xxx&scope=user,repo&redirect_uri=xxxGithub
// [Github获取token POST] https://github.com/login/oauth/access_token
// [获取Github userinfo GET] https://api.github.com/user