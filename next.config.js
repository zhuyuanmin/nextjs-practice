const withCss = require('@zeit/next-css')

const configs = {
  distDir: 'dest', // 编译输出目录
  generateEtags: true, // 服务端缓存
  // 页面内容缓存配置
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // 缓存时长
    pagesBufferLength: 2 // 缓存页面个数
  },
  pageExtensions: ['jsx', 'js'],
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID
    }
    return null
  },
  webpack(config, options) {
    return config
  },
  webpackDevMiddleware: config => {
    return config
  },
  env: {
    customKey: 'value'
  },
  // 下面两个需要通过 'next/config' 来读取
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET
  },
  publicRuntimeConfig: {
    staticFolder: '/static'
  }
}

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withCss({
  // distDir: 'dest'
  env: {
    customKey: 'value'
  },
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET
  },
  publicRuntimeConfig: {
    staticFolder: '/static'
  }
})