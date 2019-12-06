import { useCallback, memo } from 'react'
import { withRouter } from 'next/router'
import { Row, Col, List, Divider } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import api from '../lib/api'
const LANGUAGES = [
  'JavaScript', 'HTML', 'CSS',
  'TypeScript', 'Java', 'Ruby'
]

const SORT_TYPES = [
  {
    name: 'Best Match'
  },
  {
    name: 'Most Stars',
    value: 'stars',
    order: 'desc'
  },
  {
    name: 'Fewest Stars',
    value: 'stars',
    order: 'asc'
  },
  {
    name: 'Most Forks',
    value: 'forks',
    order: 'desc'
  },
  {
    name: 'Fewest Forks',
    value: 'forks',
    order: 'asc'
  }
]

const selectedItemStyle = {
  borderLeft: '2px solid #e36209',
  fontWeight: 100
}

/**
 * @param sort 排序方法
 * @param order 排序顺序
 * @param lang 仓库项目开发主语言
 * @param page 分页页面
 */

const FilterLink = memo(({ name, query, lang, sort, order }) => {
  // const doSearch = () => {
  //   Router.push({
  //     pathname: '/search',
  //     query: {
  //       query, lang, sort, order
  //     }
  //   })
  // }

  let queryString = `?query=${query}`
  if (lang) queryString += `&lang=${lang}`
  if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`

  return <Link href={`/search${queryString}`}><a>{name}</a></Link>
})


function Search({ router, repos }) {
  console.log(repos)

  const { ...querys } = router.query

  // 避免多次声明
  // const doSearch = useCallback(config => {
  //   Router.push({
  //     pathname: '/search',
  //     query: config
  //   })
  // }, [])

  return (
    <div className="root">
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={<span className="list-header">语言</span>}
            style={{ marginBottom: 20 }}
            dataSource={LANGUAGES}
            renderItem={item => {
              const selected = querys.lang === item
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  { selected
                    ? <span>{item}</span>
                    : <FilterLink
                        { ...querys }
                        lang={item}
                        name={item} 
                      />
                  }
                </List.Item>
              )
            }}
          />
          <List
            bordered
            header={<span className="list-header">排序</span>}
            dataSource={SORT_TYPES}
            renderItem={item => {
              let selected = false
              if (item.name === 'Best Match' && !querys.sort) {
                selected = true
              } else if (item.value === querys.sort && item.order === querys.order) {
                selected = true
              }
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  { selected
                    ? <span>{item.name}</span>
                    : <FilterLink
                        { ...querys }
                        order={item.order || ''}
                        name={item.name}
                        sort={item.value || ''}
                      />
                  }
                </List.Item>
              )
            }}
          />
        </Col>
      </Row>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

Search.getInitialProps = async ({ ctx }) => {
  const { query, sort, lang, order, page } = ctx.query

  if (!query) {
    return {
      repos: {
        total_count: 0
      }
    }
  }

  let queryString = `?q=${query}`
  if (lang) queryString += `language:${lang}`
  if (sort) queryString += `&sort: ${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page: ${page}`

  const result = await api.request({
    url: `/search/repositories${queryString}`
  }, ctx.req, ctx.res)

  console.log(result.data)
  return {
    repos: result.data
  }
}

export default withRouter(Search)