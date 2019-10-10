// import Comp from '../../components/comp'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic' // 异步加载组件的包
import styled from 'styled-components'
import getConfig from 'next/config'
// import moment from 'moment'

const color = '#223366'
const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`
const Comp = dynamic(import('../../components/comp'))
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const Home = props => {
  console.log(props)
  const { router, name, time, num } = props
  console.log(serverRuntimeConfig, publicRuntimeConfig)
  return (
    <>
      <Comp>
        <Title>This is Title - {time}</Title>
        <a>Welcome to Home!</a>
        { router.query.id } { name } { process.env.customKey } num:{num}
      </Comp>
      <style jsx global>{`
        a {
          color: black;
        }
      `}</style>
      {/* 全局样式在组件存在的时候生效 */}
      <style jsx>{`
        a {
          color: ${color};
        }
      `}</style>
    </>
  )
}

Home.getInitialProps = async ctx => {
  // console.log(ctx)
  ctx.reduxStore.dispatch({type: 'add', num: 3})
  const moment = await import('moment')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'jokcy',
        num: ctx.reduxStore.getState().count.num,
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      })
    }, 1000)
  })
}

export default withRouter(Home)