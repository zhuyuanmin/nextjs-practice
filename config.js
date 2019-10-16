module.exports = {
  github: {
    app_name: 'handsome',
    token_uri: 'https://github.com/login/oauth/access_token',
    client_id: '1c2dd595ed14f502cce7',
    client_secret: 'ae84b32b72372e05ceec41f0f8ba99b8bf3c6c6a'
  }
}

// [Github授权 GET] https://github.com/login/oauth/authorize?client_id=xxx&scope=user,repo&redirect_uri=xxxGithub
// [Github获取token POST] https://github.com/login/oauth/access_token
/**
 * {
      "client_id": "1c2dd595ed14f502cce7",
      "client_secret": "ae84b32b72372e05ceec41f0f8ba99b8bf3c6c6a",
      "code": "049286d0fa7cdcb7e508"
 * }
 */
// res => access_token=232ac0e53a6843664b8e0abfbf298c756d84e654

// [获取Github userinfo GET] https://api.github.com/user
// headers => Authorization: token 232ac0e53a6843664b8e0abfbf298c756d84e654
/* res =>
{
  "login": "zhuyuanmin",
  "id": 23226876,
  "node_id": "MDQ6VXNlcjIzMjI2ODc2",
  "avatar_url": "https://avatars1.githubusercontent.com/u/23226876?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/zhuyuanmin",
  "html_url": "https://github.com/zhuyuanmin",
  "followers_url": "https://api.github.com/users/zhuyuanmin/followers",
  "following_url": "https://api.github.com/users/zhuyuanmin/following{/other_user}",
  "gists_url": "https://api.github.com/users/zhuyuanmin/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/zhuyuanmin/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/zhuyuanmin/subscriptions",
  "organizations_url": "https://api.github.com/users/zhuyuanmin/orgs",
  "repos_url": "https://api.github.com/users/zhuyuanmin/repos",
  "events_url": "https://api.github.com/users/zhuyuanmin/events{/privacy}",
  "received_events_url": "https://api.github.com/users/zhuyuanmin/received_events",
  "type": "User",
  "site_admin": false,
  "name": null,
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "public_repos": 6,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2016-11-03T02:16:20Z",
  "updated_at": "2019-10-14T13:49:09Z",
  "private_gists": 0,
  "total_private_repos": 2,
  "owned_private_repos": 2,
  "disk_usage": 2514,
  "collaborators": 0,
  "two_factor_authentication": false,
  "plan": {
    "name": "free",
    "space": 976562499,
    "collaborators": 0,
    "private_repos": 10000
  }
}
*/