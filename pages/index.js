const { request } = require('../lib/api')

function Index() {
  return <span>Index</span>
}

Index.getInitialProps = async ( { ctx }) => {
  const result = await request({
    url: '/search/repositories?q=react'
  }, ctx.req, ctx.res)

  return {
    data: result.data
  }
}
export default Index