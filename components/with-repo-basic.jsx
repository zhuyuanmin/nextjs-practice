import api from '../lib/api'
import Repo from './Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'

function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='))
      return result
    }, []).join('&')
  return `?${query}`
}

export default function(Comp, type = 'index') {
  function WithDetail({ repoBasic, router, ...rest }) {
    console.log(repoBasic)
    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repoBasic} />
          <div className="tabs">
            {
              type === 'index'
              ? <span className="tab">Readme</span>
              : <Link href={`/detail${makeQuery(router.query)}`}>
                  <a className="tab index">Readme</a>
                </Link>
            }
            {
              type === 'issues'
              ? <span className="tab">Issues</span>
              : <Link href={`/detail/issues${makeQuery(router.query)}`}>
                  <a className="tab issues">Issues</a>
                </Link>
            }
          </div>
          <div><Comp {...rest} /></div>
          <style jsx>{`
            .root {
              padding-top: 20px;
            }
            .repo-basic {
              padding: 20px;
              border: 1px solid #eee;
              margin-bottom: 20px;
              border-radius: 5px;
            }
            .tab + .tab {
              margin-left: 20px;
            }
          `}</style>
        </div>
      </div>
    )
  }
  
  WithDetail.getInitialProps = async ( context ) => {
    // console.log(ctx.query)
    const { router, ctx } = context
    const { owner, name } = ctx.query
    const repoBasic = await api.request({
      url: `/repos/${owner}/${name}`
    }, ctx.req, ctx.res)
    
    let pageData = {}
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context)
    }

    return {
      repoBasic: repoBasic.data,
      ...pageData
    }
  }
  return withRouter(WithDetail)
}