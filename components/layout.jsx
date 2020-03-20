import { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { withRouter } from 'next/router'
// import getConfig from 'next/config'
import Container from './Container'
import { logout } from '../store/store'
import {
  Layout,
  Icon,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu
} from 'antd'

const { Header, Content, Footer } = Layout
// const { publicRuntimeConfig } = getConfig()

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const footerStyle = {
  textAlign: 'center'
}

const Comp = ({ color, children, style }) => <div style={{ color, ...style }}>{ children }</div>

function MyLayout({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query

  const [search, setSearch] = useState(urlQuery || '')
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value)
  }, [])
  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`)
  }, [search])
  const handleLogout = useCallback(() => {
    logout()
  }, [logout])
  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>登 出</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <a><Icon type="github" style={githubIconStyle}></Icon></a>
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {
                user && user.id ? (
                  <Dropdown overlay={userDropDown}>
                    <Avatar size={40} src={user.avatar_url} />
                  </Dropdown>
                ) : (
                  <Tooltip title="点击登录">
                    <a href={`/prepare-auth?url=${router.asPath}`}>
                      <Avatar size={40} icon={'user'} />
                    </a>
                  </Tooltip>
                )
              }
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={
          <Comp style={{ fontSize: 20 }} />
        }>{ children }</Container>
      </Content>
      <Footer>
        <div style={footerStyle}>
          Develop by zhuyuanmin &nbsp;&nbsp;
          <a href="mailto:zhuyuanmin@163.com">zhuyuanmin@163.com</a>
        </div>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  )
}

export default connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
  return {
    logout: () => dispatch(logout())
  }
})(withRouter(MyLayout))