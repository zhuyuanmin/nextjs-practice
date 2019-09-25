import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default ({ children }) => {
  function gotoHome() {
    Router.push({
      pathname: '/home/index',
      query: { id: 2 }
    }, '/home/index/2')
  }
  return (
    <>
      <Link href="/about?id=1" as="/about/1">
        <Button>Welcome</Button>
      </Link>
      <Button onClick={ gotoHome }>test home</Button>
      <hr/>
      { children }
    </>
  )
}